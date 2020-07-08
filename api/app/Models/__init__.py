from .dbSettings import *
import postgresql
from .create_database import create_database


try:
    db = postgresql.open(f'pq://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}')
except:
    create_database()
    db = postgresql.open(f'pq://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}')
    
def add_user(username, email, firstname, lastname, password):
    ps = db.prepare("""INSERT INTO users(username, email, firstname, lastname, password)
        VALUES ($1, $2, $3, $4, $5)""")
    ps(username, email, firstname, lastname, password)

def add_image(user_id, image_url):
    ps = db.prepare("""INSERT INTO images(url, user_id)
        VALUES ($1, $2)""")
    ps(image_url, user_id)

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
        WHERE id=$2 """)
    ps(image_id, user_id)

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

    """)
    ps(user_id)





def add_profile_visit(visitor_id, profile_id):
    ps = db.prepare(f"""
        INSERT INTO profile_visits(profile_id, visitor_id)
        VALUES ($1, $2)""")
    ps(profile_id, visitor_id)

def add_profile_like(liker_id, profile_id):
    ps = db.prepare(f"""
        INSERT INTO profile_likes(profile_id, liker_id)
        VALUES ($1, $2)""")
    ps(profile_id, liker_id)

