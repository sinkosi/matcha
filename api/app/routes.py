from app import app
from app import Models
from flask import jsonify, request
from flask_restful import Resource, Api
from app import validators, notifications

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
		
		print("registering a user...")
		print(data)
		Models.add_user(data['username'], data['email'], data['firstname'], data['lastname'], data['password'])
		notifications.send_registration_activation_email(data['username'], data['email'], '123456789assdfghjyyytru')
		return {'received': data}, 201


class login(Resource):
	def post(self):
		data = request.get_json()
		status, errors = validators.login(data)
		if not status:
			return {"errors": errors}, 404
		
		print("logging in user...")
		notifications.send_login_notification("email")
		return {'received': data}, 201

class users(Resource):
	def get(self):
		return jsonify(Models.get_users())

class user(Resource):
	def get(self, user_id):
		return jsonify(Models.get_user_details(user_id))

	def put(self, user_id):
		return jsonify({'put data': request.get_json()})

class activate_account(Resource):
	def get(self, activation_key):
		return {'message': 'account activated succefully', 'key': activation_key}

api.add_resource(index,"/")
api.add_resource(register, "/register")
api.add_resource(login, "/login")
api.add_resource(users, "/users")
api.add_resource(user, "/users/<user_id>")
api.add_resource(activate_account, "/activateaccount")
