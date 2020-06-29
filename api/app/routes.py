from app import app
from flask import jsonify, request
from flask_restful import Resource, Api

api = Api(app)


class index(Resource):
	def get(self):
		return jsonify({'page': 'Home'})

class register(Resource):
	def post(self):
		return jsonify({'TODO': 'Registration logic'})


api.add_resource(index,"/")
api.add_resource(register, "/register")
