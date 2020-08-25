import requests
from app import Models


URL = "https://randomuser.me/api/"
  

# PARAMS = {'address':location} 
  
for i in range(1):
    print(i)
        
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

    address1 = f"{user['location']['street']['number']} {user['location']['street']['name']}"
    address2 = None
    city = user['location']['city']
    state = user['location']['state']
    code = str(user['location']['postcode'])
    longitude = user['location']['coordinates']['longitude']
    latitude = user['location']['coordinates']['latitude']

    print(address1, address2, city, state, code, longitude, latitude, sep='\n')

    user_id = Models.add_user(username, email, firstname, lastname, password)

    Models.set_gender(user_id, gender)
    image_id = Models.add_image(user_id, image_url)
    Models.set_profile_pic(user_id, image_id)
    print(image_id)
    Models.set_sexual_preference(user_id, 'female' if (gender == 'male') else 'male')
    location_id = Models.add_location(user_id, address1, address2, city, state, code, longitude, latitude)
    Models.set_location(user_id, location_id)
    print(Models.get_user_details(user_id))
