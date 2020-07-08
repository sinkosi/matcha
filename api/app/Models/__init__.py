from .dbSettings import *
import postgresql
from .create_database import create_database


try:
    db = postgresql.open(f'pq://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}')
except:
    create_database()
    db = postgresql.open(f'pq://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}')
    
def add_user(username, email, firstname, lastname, password):
    ps = db.prepare("""
        INSERT INTO users(username, email, firstname, lastname, password)
        VALUES ($1, $2, $3, $4, $5) RETURNING id; """)
    return ps.first(username, email, firstname, lastname, password)

def add_image(user_id, image_url):
    ps = db.prepare("""INSERT INTO images(url, user_id)
        VALUES ($1, $2) RETURNING id """)
    return ps.first(image_url, user_id)

def add_location(user_id, address1, address2, city, state, code, longitude, latitude):
    ps = db.prepare( """
        INSERT INTO location(address1, address2, city, state, code, longitude, latitude, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id """)
    return ps.first(address1, address2, city, state, code, longitude, latitude, user_id)

def set_gender(user_id, gender):
    ps = db.prepare("""
        UPDATE users
        SET gender=$1, modified=CURRENT_TIMESTAMP
        WHERE id=$2""")
    ps(gender, user_id)

def set_biography(user_id, biography):
    ps = db.execute("""
        UPDATE users
        SET biography=$1, modified=CURRENT_TIMESTAMP
        WHERE id=$2 """)
    ps(biography, user_id)

def set_sexual_preference(user_id, sexual_preference):
    ps = db.prepare("""
        UPDATE users
        SET sexual_preferences=$1, modified=CURRENT_TIMESTAMP
        WHERE id=$2 """)
    ps(sexual_preference, user_id)

def set_profile_pic(user_id, image_id):
    ps = db.prepare("""
        UPDATE users
        SET profile_pic=$1, modified=CURRENT_TIMESTAMP
        WHERE id=$2""")
    ps(image_id, user_id)

def set_location(user_id, location_id):
    ps = db.prepare("""
        UPDATE users
        SET location=$1, modified=CURRENT_TIMESTAMP
        WHERE id=$2""")
    ps(location_id, user_id)

def set_profile_complete(user_id):
    ps = db.prepare("""
        UPDATE users
        SET completed='true', completed_date=CURRENT_TIMESTAMP
        WHERE id=$1 """)
    ps(user_id)

def set_profile_activated(user_id):
    ps = db.prepare("""
        UPDATE users
        SET activated='true', activated_date=CURRENT_TIMESTAMP
        WHERE id=$1 """)
    ps(user_id)

def is_activated(user_id):
    ps = db.prepare("SELECT activated FROM users WHERE id=$1")
    return ps.first(user_id)

def is_completed(user_id):
    ps = db.prepare("SELECT completed FROM users WHERE id=$1")
    return ps.first(user_id)

def get_user_details(user_id):
    ps = db.prepare("""
        SELECT users.id, username, email, firstname, lastname, password, gender, biography, sexual_preferences, activated, completed, profile_pic, url as image_url
        FROM users LEFT JOIN images
        ON users.profile_pic = images.id
        WHERE users.id=$1
    """)
    return dict(ps.first(user_id))

def remove_user(user_id):
    ps = db.prepare("""
        DELETE FROM users
        WHERE users.id=$1 CASCADE
    """)
    ps(user_id)

def get_image_url(image_id):
    ps = db.prepare("""
        SELECT url as image_url FROM images
        WHERE id=$1""")
    return ps(image_id)

def get_user_images(user_id):
    ps = db.prepare("""
        SELECT * FROM images
        WHERE user_id=$1""")
    return ps(user_id)



def add_profile_visit(visitor_id, profile_id):
    ps = db.prepare(f"""
        INSERT INTO profile_visits(profile_id, visitor_id)
        VALUES ($1, $2)""")
    ps(profile_id, visitor_id)

def add_profile_like(liker_id, profile_id):
    ps = db.prepare(f"""
        INSERT INTO profile_likes(profile_id, liker_id)
        VALUES ($1, $2) RETURNING id""")
    return ps.first(profile_id, liker_id)

def add_activation_code(profile_id, activation_code):
    ps = db.prepare("""
        INSERT INTO activation_codes(profile_id, code)
        VALUES ($1, $2)""")
    ps(profile_id, activation_code)

def remove_activation_code(profile_id, activation_code):
    ps = db.prepare("""
        DELETE FROM activation_codes
        WHERE profile_id=$1 and code=$2)""")
    ps(profile_id, activation_code)

def get_user_id_by_username_password(username, password):
    ps = db.prepare("""
        SELECT id FROM users WHERE username=$1 and password=$2""")
    return ps.first(username, password)

def get_user_id_by_email_password(email, password):
    ps = db.prepare("""
        SELECT id FROM users WHERE email=$1 and password=$2""")
    return ps.first(email, password)

def get_users(limit=20, filter="", page=1):
    ps = db.prepare(f"""
        SELECT * FROM users {filter} LIMIT $1 OFFSET {(page * limit) - limit}""")
    return list(map(dict, ps(limit)))