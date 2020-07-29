from app import app
from app import Models
from flask import jsonify, request, send_from_directory, send_file
from flask_restful import Resource, Api
from app import validators, notifications
import random
import os
import base64
import binascii
import json
from app import my_jwt

api = Api(app)
UPLOAD_DIRECTORY = "uploads/images/"
UPLOAD_DIRECTORY_PUBLIC = "../uploads/images/"

def must_be_logged_in(function):
	def function_decoration(*args, **kwargs):
		if not "token" in request.headers:
			return {'message': 'no token was provided'}, 401

		if (request.headers['token'][0: 6] != "bearer"):
			return {'message': 'token must start with the keyword bearer'}, 401

		token = request.headers['token'][6: ].strip().split('.')

		if len(token) != 3:
			return {'message': 'invalid token. Must have 3 parts'}, 401

		[header, payload, signature] = token

		if not my_jwt.verify_token(str(header), str(payload), str(signature)):
			return {'message': 'invalid token. token tempered with'}, 401

		try:
			token_payload = base64.b64decode(payload+'===').decode("ASCII")
			token_payload = json.loads(token_payload)
		except binascii.Error as err:
			print(err)
			return {'message': 'error decoding token'}, 501

		user_id = token_payload['id']

		return function(*args, **kwargs, id=user_id)
	
	return function_decoration


class index(Resource):
	def get(self):
		return {'page': 'Home'}

class register(Resource):
	def post(self):
		data = request.get_json()
		status, errors = validators.register(data)
		if not status:
			return {"errors": errors}, 404
		
		print(data)
		
		activation_code = 'cpf'+str(random.randint(100000000000000,999999999999999 ))+'xvf'
		user_id = Models.add_user(data['username'], data['email'], data['firstname'], data['lastname'], data['password'])
		Models.add_activation_code(user_id, activation_code)
		notifications.send_registration_activation_email(data['username'], data['email'], user_id, activation_code)
		return {'message': 'registration successful'}, 201


class login(Resource):
	def post(self):
		data = request.get_json()
		print(data)
		status, errors = validators.login(data)
		if not status:
			return {"errors": errors}, 401

		user_id = Models.get_user_id_by_email_password(data['login'], data['password']) or Models.get_user_id_by_username_password(data['login'], data['password'])
		print("user id", user_id)
		if not user_id:
			return {'message': 'wrong login details'} , 401
		
		activated = Models.is_activated(user_id)
		completed = Models.is_completed(user_id)

		print("activated: ", activated)
		if not activated:
			return {'activated': activated, 'message': 'account not activated' }
		
		print("completed: ", completed)
		token = my_jwt.sign_token(my_jwt.generate_header(), {'id': str(user_id)})
		notifications.send_login_notification("email")

		print(token)
		return {'activated': activated, 'completed': completed, 'token': token, 'message': 'login seccessful'} , 201

class users(Resource):
	@must_be_logged_in
	def get(self, id=''):
		return jsonify(Models.get_users())


class user(Resource):
	@must_be_logged_in
	def get(self, user_id, id=''):
		if user_id != id:
			Models.add_profile_visit(id, user_id)
		return jsonify(Models.get_user_details(user_id))

	@must_be_logged_in
	def put(self, user_id, id=''):
		if user_id != id:
			return {'message': 'Unauthorised action.'}, 401

		data = request.get_json()
		errors = {}

		print(data)
		if data.get('username'):
			ok, error = validators.username(data.get('username'))
			if ok:
				Models.set_username(user_id, data.get('firstname'))
			else:
				errors['username'] = error

	
		if data.get('firstname'):
			ok, error = validators.name(data.get('firstname'))
			if ok:
				Models.set_firstname(user_id, data.get('firstname'))
			else:
				errors['firstname'] = error

		if data.get('lastname'):
			ok, error = validators.name(data.get('lastname'))
			if ok:
				Models.set_lastname(user_id, data.get('lastname'))
			else:
				errors['lastname'] = error

		if data.get('email'):
			ok, error = validators.email(data.get('email'))
			if ok:
				Models.set_email(user_id, data.get('email'))
			else:
				errors['email'] = error

		if data.get('sexual_preference'):
			ok, error = validators.sexual_preference(data.get('sexual_preference'))
			if ok:
				Models.set_sexual_preference(user_id, data.get('sexual_preference'))
			else:
				errors['sexual_preference'] = error
		
		if data.get('gender'):
			ok, error = validators.gender(data.get('gender'))
			if ok:
				Models.set_gender(user_id, data.get('gender'))
			else:
				errors['gender'] = error

		if data.get('biography'):
			ok, error = validators.biography(data.get('biography'))
			if ok:
				Models.set_biography(user_id, data.get('biography'))
			else:
				errors['biography'] = error

		if data.get('interests'):
			ok, error = validators.interests(data.get('interests'))
			if ok:
				# Models.set_interests(user_id, data.get('interests'))
				interests = data.get('interests')
				for interest in interests:
					try:
						Models.add_interest(interest)
					except:
						pass
					interest_id = Models.get_interest_id(interest)
					if not Models.user_interest_exist(user_id, interest_id):
						Models.add_user_interest(user_id, interest_id)
				
			else:
				errors['interests'] = error

		if data.get('profilePic'):
			image_id = data['profilePic']
			if not Models.get_image_url(image_id):
				errors['profilePic'] = 'image does not exist'
		
			elif str(Models.get_image_owner(image_id)) != user_id:
				errors['profilePic'] = 'can not set someone else image as your profile pic'
			
			else:
				Models.set_profile_pic(user_id, image_id)

		if data.get('location'):
			ok, error = validators.location(data.get('location'))
			if ok:
				Models.set_location(user_id, data.get('location'))
			else:
				errors['location'] = error

		user = Models.get_user_details(user_id)
		
		profile_completed = False
		if user['gender'] and user['sexual_preferences'] and user['biography'] and user['profile_pic']:
			Models.set_profile_complete(user_id)
			profile_completed = True

		return {'errors': errors, 'completed': profile_completed }


class activate_account(Resource):
	def get(self, user_id, activation_key):
	
		if Models.is_activated(user_id):
			return {'message': 'User account already activated'}, 200

		expected = Models.get_activativation_key(user_id)
		if expected and expected != activation_key:
			print("expected: ", Models.get_activativation_key(user_id))
			print("recieved: ", activation_key)
			return {'message': 'wrong activation key'}, 401
		
		# activate user:
		Models.remove_activation_code(user_id, activation_key)
		Models.set_profile_activated(user_id)
		return {'message': 'account activated succefully'}, 200

class interests(Resource):
	@must_be_logged_in
	def get(self, id):
		print(Models.get_interests_list())
		return Models.get_interests_list()

class interest(Resource):
	@must_be_logged_in
	def get(self, interest, id):
		return Models.get_users_with_interest(interest)

import codecs
class images(Resource):
	@must_be_logged_in
	def post(self, id):
		print(Models.get_user_images(id))
		if len(Models.get_user_images(id)) >= 5:
			return {'message': 'maximum number of images reached'}, 403

		image = request.get_json()
		image_data = bytes(image['data'], 'utf-8')
		filename = os.path.join(UPLOAD_DIRECTORY, id+"_"+str(random.randint(100,99999))+"."+image['name'].split('.')[-1])
		with open(filename, "wb") as f:
			f.write(codecs.decode(image_data, 'base64'))
		image_id = Models.add_image(id, filename)
		print('image id: ', image_id)
		return {'message': 'endpoint /images was hit', 'image_id': image_id}

class image(Resource):
	@must_be_logged_in
	def delete(self, image_id):
		# Models.get_image_url(imagp)
		pass

class serve_images_public(Resource):
	def get(self, image_name):
		print('image name: ', image_name)
		print(UPLOAD_DIRECTORY)
		file_path = os.path.join(UPLOAD_DIRECTORY,image_name)
		print(file_path)
		return send_file(file_path, 'image/*', as_attachment=True)

class forgot_password(Resource):
	def post(self):
		data = request.get_json()

		if data.get('step1'):
			user_id = Models.get_user_id_by_email(data['step1']['email'])
			otp = random.randint(10000,99999)
			Models.add_activation_code(user_id, str(otp))
			notifications.send_password_reset_otp(data['step1']['email'], otp)
			pass

		if data.get('step2'):
			user_id = Models.get_user_id_by_email(data['step3']['email'])
			otp = Models.get_activativation_key(user_id)
			
			if str(otp) != str(data['step2']['otp']):
				return {'message': 'invalid otp'}, 401
			
			Models.set_password(user_id, data['step2']['password'])
			return {'message': 'password reset was successful'}

api.add_resource(index,"/")
api.add_resource(register, "/register")
api.add_resource(login, "/login")
api.add_resource(users, "/users")
api.add_resource(user, "/users/<user_id>")
api.add_resource(forgot_password, "/resetpassword")

api.add_resource(interests, "/interests")
api.add_resource(interest, "/interests/<interest>")
api.add_resource(activate_account, "/activate/<user_id>/<activation_key>")

api.add_resource(images, "/images")
api.add_resource(image, "/images/<image_id>")
api.add_resource(serve_images_public, "/public/images/<image_name>")
