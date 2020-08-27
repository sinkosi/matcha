def username(username):
    error = ''
    return True, error

def name(name):
    error = ''
    return True, error

def password(password):
    error = ''
    return True, error

def email(email):
    error = ''
    return True, error

def register(registration_data):
    errors = []
    return True, errors

def login(login_data):
    errors = []
    return True, errors

def sexual_preference(preference):
    error = ''
    if preference != 'males' and preference != 'females' and preference != 'both':
        error = 'sexual prefences can only be "males", "females" or "both" '
        return False, error
    else:
        return True, error

def gender(gender):
    error = ''
    if gender != 'male' and gender != 'female' and gender != 'bisexual':
        error = 'gender can only be "male", "females", or "bisexual"'
        return False, error
    else:
        return True, error

def biography(gender):
    error = ''
   
    return True, error

def interests(interests_arr):
    error = ''
    for interest in interests_arr:
       if interest[0 : 1] != "#":
           return False, "each interest must start with a #"
    return True, error
