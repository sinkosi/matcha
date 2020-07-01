import psycopg2
from psycopg2 import OperationalError
from .dbSettings import *


def create_connection(db_name, db_user, db_password, db_host, db_port):
    connection = None
    try:
        connection = psycopg2.connect(
            database=db_name,
            user=db_user,
            password=db_password,
            host=db_host,
            port=db_port,
        )
        print("Connection to PostgreSQL DB successful")
    except OperationalError as e:
        print(f"The error '{e}' occurred")
    return connection

def execute(connection, query):
    connection.autocommit = True
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        print("Query executed successfully")
        return True
    except OperationalError as e:
        print(f"The error '{e}' occurred")
        return False

def database_exist(db_name):
    try:
        create_connection(db_name, db_user, db_password, db_host, db_port)
        return True
    except:
        return False



def create_database(db_name):
    if not database_exist(db_name):
        query = f"CREATE DATABASE {db_name}"
        server_connection = create_connection('', db_user, db_password, db_host, db_port)
        execute(server_connection,query)






create_database(db_name)
connection = create_connection(db_name, db_user, db_password, db_host, db_port)

print("Hello world")
# create_database_query = "CREATE DATABASE matcha"
# create_database(server_connection, create_database_query)

query_create_table_users = """
CREATE TABLE IF NOT EXISTS users
(
    id serial  PRIMARY KEY ,
    username text NOT NULL,
    email text NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    password text NOT NULL,
    gender text,
    biography text,
    sexual_preferences text,
    profie_pic text,
    registered TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
"""

query_create_table_activated = """
CREATE TABLE IF NOT EXISTS activated
(
    id serial  PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    activated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
"""

query_create_table_profile_complete = """
CREATE TABLE IF NOT EXISTS complete
(
    id serial  PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    completed TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
"""

query_create_table_interests = """
CREATE TABLE IF NOT EXISTS interests
(
    id serial  PRIMARY KEY,
    hashtag text NOT NULL,
    added TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
"""

query_create_table_users_interests = """
CREATE TABLE IF NOT EXISTS users_interests
(
    id serial  PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    interest_id INTEGER REFERENCES interests(id),
    linked TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
"""


query_create_table_images = """
CREATE TABLE IF NOT EXISTS images
(
    id serial  PRIMARY KEY,
    url text NOT NULL,
    user_id INTEGER REFERENCES users(id),
    uploaded TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
"""

query_create_table_profile_visits = """
CREATE TABLE IF NOT EXISTS profile_visits
(
    id serial  PRIMARY KEY,
    profile_id INTEGER REFERENCES users(id),
    visitor_id INTEGER REFERENCES users(id),
    visited TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
"""

query_create_table_profile_likes = """
CREATE TABLE IF NOT EXISTS profile_likes
(
    id serial  PRIMARY KEY,
    profile_id INTEGER REFERENCES users(id),
    liker_id INTEGER REFERENCES users(id),
    liked TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
"""


def create_tabels():
    execute(connection, query_create_table_interests)
    execute(connection, query_create_table_users)
    execute(connection, query_create_table_images)
    execute(connection, query_create_table_activated)
    execute(connection, query_create_table_profile_complete)
    execute(connection, query_create_table_users_interests)
    execute(connection, query_create_table_profile_visits)
    execute(connection, query_create_table_profile_likes)


create_tabels()


from . import user
