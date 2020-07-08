import requests
from app import Models


URL = "https://randomuser.me/api/"
  

# PARAMS = {'address':location} 
  

r = requests.get(url = URL) 
# r = requests.get(url = URL, params = PARAMS) 
  

data = r.json()

user = data['results'][0]
  
firstname = user['name']['first']
lastname = user['name']['last']
username = user['login']['username']
email = user['email']
password = user['login']['password']
gender = user['gender']
image_url = user['picture']['large']

Models.add_user(username, email, firstname, lastname, password)
user_id = Models.get_user_by_username_password(username, password)[0]
Models.set_gender(user_id, gender)
Models.add_image(user_id, image_url)
Models.set_sexual_preference(user_id, 'female' if (gender == 'male') else 'male')
print(Models.get_user_details(user_id))
