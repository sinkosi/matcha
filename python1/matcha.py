from app import app 
from flask_socketio import SocketIO
from flask_cors import CORS

socketio = SocketIO(app)
CORS(app)

if __name__ == '__main__':
    # app.run(debug=True)
    socketio.run(app, debug=True)