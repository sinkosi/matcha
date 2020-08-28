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

def set_username(user_id, username):
    ps = db.prepare("""
        UPDATE users
        SET username=$1, modified=CURRENT_TIMESTAMP
        WHERE id=$2""")
    ps(username, user_id)

def set_firstname(user_id, firstname):
    ps = db.prepare("""
        UPDATE users
        SET firstname=$1, modified=CURRENT_TIMESTAMP
        WHERE id=$2""")
    ps(firstname, user_id)

def set_lastname(user_id, lastname):
    ps = db.prepare("""
        UPDATE users
        SET lastname=$1, modified=CURRENT_TIMESTAMP
        WHERE id=$2""")
    ps(lastname, user_id)

def set_email(user_id, email):
    ps = db.prepare("""
        UPDATE users
        SET email=$1, modified=CURRENT_TIMESTAMP
        WHERE id=$2""")
    ps(email, user_id)

def set_password(user_id, password):
    ps = db.prepare("""
        UPDATE users
        SET password=$1, modified=CURRENT_TIMESTAMP
        WHERE id=$2""")
    ps(password, user_id)

def set_gender(user_id, gender):
    ps = db.prepare("""
        UPDATE users
        SET gender=$1, modified=CURRENT_TIMESTAMP
        WHERE id=$2""")
    ps(gender, user_id)

def set_biography(user_id, biography):
    ps = db.prepare("""
        UPDATE users
        SET biography=$1, modified=CURRENT_TIMESTAMP
        WHERE id=$2""")
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
        SELECT users.id, username, email, firstname, lastname, password, gender,
            biography, sexual_preferences, activated, completed, profile_pic, url as image_url
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

def get_image_owner(image_id):
    ps = db.prepare("""
        SELECT user_id FROM images
        WHERE id=$1""")
    return ps.first(image_id)



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
        WHERE profile_id=$1 AND code=$2""")
    ps(profile_id, activation_code)

def get_user_id_by_username_password(username, password):
    ps = db.prepare("""
        SELECT id FROM users WHERE username=$1 and password=$2""")
    return ps.first(username, password)

def get_user_id_by_email_password(email, password):
    ps = db.prepare("""
        SELECT id FROM users WHERE email=$1 and password=$2""")
    return ps.first(email, password)

def get_user_id_by_email(email):
    ps = db.prepare("""
        SELECT id FROM users WHERE email=$1""")
    return ps.first(email)

def get_users(limit=20, filter="", page=1):
    ps = db.prepare(f"""
        SELECT users.id, username, email, firstname, lastname, password, gender,
            biography, sexual_preferences, activated, completed, profile_pic, url as image_url
        FROM users LEFT JOIN images
        ON users.profile_pic = images.id 
        {filter}
        LIMIT $1 OFFSET {(page * limit) - limit}""")
    return list(map(dict, ps(limit)))



def add_interest(interest):
    ps = db.prepare("""
        INSERT INTO interests(hashtag)
        VALUES ($1)""")
    ps(interest)

def get_interest_id(interest):
    ps = db.prepare("""
        SELECT hashtag FROM interests
        WHERE hashtag=$1 """)
    return ps.first(interest)

def get_interests_list():
    ps = db.prepare("""
        SELECT hashtag FROM interests """)
    return list(map(lambda x: x[0] ,ps()))

def add_user_interest(user_id, interest):
    ps = db.prepare("""
        INSERT INTO users_interests(user_id, interest_id) 
        VALUES ($1, $2) """)
    ps(user_id, interest)


def user_interest_exist(user_id, interest):
    ps = db.prepare("""
        SELECT * FROM users_interests
        WHERE user_id=$1 AND interest_id=$2 
        """)
    exist = ps.first(user_id, interest)
    if exist:
        return True
    else:
        return False

def get_users_with_interest(interest):
    pass

def get_activativation_key(user_id):
    ps = db.prepare("""
        SELECT code FROM activation_codes 
        WHERE profile_id=$1 """)
    return ps.first(user_id)