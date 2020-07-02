from app import app
from app import Models
from flask import jsonify, request
from flask_restful import Resource, Api

api = Api(app)


class index(Resource):
	def get(self):
		return jsonify({'page': 'Home'})

class register(Resource):
	def post(self):
		return jsonify({'TODO': 'Registration logic'})

class login(Resource):
	def post(self):
		return jsonify({'TODO': 'Registration logic'})

class users(Resource):
	def get(self):
		return jsonify(Models.get_users())

class user(Resource):
	def post(self):
		return jsonify({'TODO': 'Registration logic'})


api.add_resource(index,"/")
api.add_resource(register, "/register")
api.add_resource(login, "/login")
api.add_resource(users, "/users")
api.add_resource(user, "/user")
