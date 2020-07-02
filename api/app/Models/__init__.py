import psycopg2
from psycopg2 import OperationalError, extras
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

def execute_fetchall(connection, query):
    connection.autocommit = True
    cursor = connection.cursor(cursor_factory=extras.DictCursor)
    results = None
    try:
        cursor.execute(query)
        print("Query executed successfully")
        results = cursor.fetchall()
        return results
    except OperationalError as e:
        print(f"The error '{e}' occurred")
        return False

def execute_fetchone(connection, query):
    connection.autocommit = True
    cursor = connection.cursor(cursor_factory=extras.DictCursor)
    dir(extras)
    result = None
    try:
        cursor.execute(query)
        print("Query executed successfully")
        result = cursor.fetchone()
        return result
    except OperationalError as e:
        print(f"The error '{e}' occurred")
        return False

def database_exist(db_name):
    if create_connection(db_name, db_user, db_password, db_host, db_port) is not None:
        return True

    return False


def create_database(db_name):
    if not database_exist(db_name):
        print("something")
        query = f"CREATE DATABASE {db_name}"
        server_connection = create_connection('', db_user, db_password, db_host, db_port)
        execute(server_connection,query)






create_database(db_name)
connection = create_connection(db_name, db_user, db_password, db_host, db_port)

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
    profiLe_pic integer,
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

query_change_user_profile_pic_to_reference_images = """
    ALTER TABLE users 
    ADD CONSTRAINT users_image_id_fkey FOREIGN KEY (profile_pic) REFERENCES images (id);
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
    execute(connection, query_change_user_profile_pic_to_reference_images)


def add_user(username, email, firstname, lastname, password):
    query = f"""INSERT INTO users(username, email, firstname, lastname, password)
    VALUES ('{username}', '{email}', '{firstname}', '{lastname}', '{password}')"""
    execute(connection, query)

def add_image(user_id, image_url):
    query = f"""INSERT INTO images(url, user_id)
    VALUES ('{image_url}', '{user_id}')"""
    execute(connection, query)

def get_user_details(user_id):
    query = f"""
        SELECT * FROM users
        WHERE id={user_id}"""
    return execute_fetchone(connection, query)

def get_user_by_username_password(username, password):
    query = f"""
        SELECT id FROM users
        WHERE username='{username}' AND password='{password}' """
    return execute_fetchone(connection, query)

def get_user_by_email_password(email, password):
    query = f"""
        SELECT id FROM users
        WHERE email='{email}' AND password='{password}' """
    return execute_fetchone(connection, query)

def set_gender(user_id, gender):
    query = f"""
        UPDATE users
        SET gender='{gender}', modified=CURRENT_TIMESTAMP
        WHERE id={user_id} """
    return execute(connection, query)

def set_biography(user_id, biography):
    query = f"""
        UPDATE users
        SET biography='{biography}', modified=CURRENT_TIMESTAMP
        WHERE id={user_id} """
    return execute(connection, query)

def set_sexual_preference(user_id, sexual_preference):
    query = f"""
        UPDATE users
        SET sexual_preferences='{sexual_preference}', modified=CURRENT_TIMESTAMP
        WHERE id={user_id} """
    return execute(connection, query)

def set_profile_pic(id, image_id):
    query = f"""
        UPDATE users
        SET profile_pic='{image_id}', modified=CURRENT_TIMESTAMP
        WHERE id={id} """
    return execute(connection, query)


def add_profile_visit(visitor_id, profile_id):
    query = f"""
        INSERT INTO profile_visits(profile_id, visitor_id)
        VALUES ('{profile_id}', '{visitor_id}')"""
    execute(connection, query)

def add_profile_like(liker_id, profile_id):
    query = f"""
        INSERT INTO profile_likes(profile_id, liker_id)
        VALUES ('{profile_id}', '{liker_id}')"""
    execute(connection, query)

def activate_user(user_id):
    query = f"""
        INSERT INTO activated(user_id)
        VALUES ('{user_id}')"""
    execute(connection, query)

def delete_image(image_id):
    query = f"""
        DELETE FROM images
        WHERE id='{image_id}'"""
    execute(connection, query)

def get_user_images(user_id):
    query = f"""
        SELECT id, url, uploaded FROM images
        WHERE user_id='{user_id}' """
    results = execute_fetchall(connection, query)
    return list(map(dict, results))

def get_users():
    query = f"""
        SELECT * FROM users """
    results = execute_fetchall(connection, query)
    return list(map(dict, results))