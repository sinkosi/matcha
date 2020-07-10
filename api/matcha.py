from app import app 
from flask_socketio import SocketIO

socketio = SocketIO(app)
if __name__ == '__main__':
    # app.run(debug=True)
    socketio.run(app, debug=True)