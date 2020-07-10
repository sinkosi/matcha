from app import app
from app import Models
from flask import jsonify, request
from flask_restful import Resource, Api
from app import validators, notifications
import random


api = Api(app)

class index(Resource):
	def get(self):
		return {'page': 'Home'}

class register(Resource):
	def post(self):
		data = request.get_json()
		status, errors = validators.register(data)
		if not status:
			return {"errors": errors}, 404
		
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
		print("logging in user...")
		notifications.send_login_notification("email")

		return {'activated': activated, 'completed': completed, 'message': 'account not activated'}, 201

class users(Resource):
	def get(self):
		return jsonify(Models.get_users())

class user(Resource):
	def get(self, user_id):
		return jsonify(Models.get_user_details(user_id))

	def put(self, user_id):
		return jsonify({'put data': request.get_json()})

class activate_account(Resource):
	def get(self, user_id, activation_key):
		print("___________user_id: "+ user_id, "_____________code: "+ activation_key, sep="\n")
		print("expected: ", Models.get_activativation_key(user_id))
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
	def get(self):
		print(Models.get_interests_list())
		return Models.get_interests_list()

class interest(Resource):
	def get(self, interest):
		return Models.get_users_with_interest(interest)

		
api.add_resource(index,"/")
api.add_resource(register, "/register")
api.add_resource(login, "/login")
api.add_resource(users, "/users")
api.add_resource(user, "/users/<user_id>")

api.add_resource(interests, "/interests")
api.add_resource(interest, "/interests/<interest>")
api.add_resource(activate_account, "/activate/<user_id>/<activation_key>")
