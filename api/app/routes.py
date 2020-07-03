from app import app
from app import Models
from flask import jsonify, request
from flask_restful import Resource, Api
from app import validators, notifications

api = Api(app)


class index(Resource):
	def get(self):
		return jsonify({'page': 'Home'})

class register(Resource):
	def post(self):
		data = request.get_json()
		status, errors = validators.register(data)
		if not status:
			return {"errors": errors}, 404
		
		print("registering a user...")
		notifications.send_registration_activation_email("email")
		return {'received': data}, 201

	def get(self):
		return jsonify({'text': 'hello'})

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



api.add_resource(index,"/")
api.add_resource(register, "/register")
api.add_resource(login, "/login")
api.add_resource(users, "/users")
api.add_resource(user, "/users/<int:user_id>")
