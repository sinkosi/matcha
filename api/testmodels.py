from app.Models import *

# create_database('matcha')
# create_tabels()

# connection = create_connection('', 'postgres', 'postgres', '0.0.0.0', 5431)



# add_user("user1", "user1@mail.com", "user1_firstname", "user1_lastname", "users1_strong_password")
# add_user("user2", "user2@mail.com", "user2_firstname", "user2_lastname", "users2_strong_password")
# add_user("user3", "user3@mail.com", "user3_firstname", "user3_lastname", "users3_strong_password")
# add_user("user4", "user4@mail.com", "user4_firstname", "user4_lastname", "users4_strong_password")
# add_user("user5", "user5@mail.com", "user5_firstname", "user5_lastname", "users5_strong_password")
# add_user("user6", "user6@mail.com", "user6_firstname", "user6_lastname", "users6_strong_password")

# add_image(2, "directory/to/the/image.jpg")
# add_image(2, "directory/to/the/image.jpg")
# add_image(1, "directory/to/the/image.jpg")
# add_image(1, "directory/to/the/image.jpg")
# add_image(3, "directory/to/the/image.jpg")

# set_sexual_preference(2, "males")
# set_profile_pic(1, 1)
# set_biography(2, "this is user2s bio")
# set_gender(6, "male")
# print("get user details", get_user_details(1), sep="-=-=>")
# print("username password: ", get_user_by_username_password('user8', 'users4_strong_password'))
# print("email password: ", get_user_by_email_password('user3@mail.com', 'users3_strong_password'))



# get_user_by_username_password('user', 'password')
# print(results)

# add_profile_visit(1,2)
# add_profile_visit(1,3)
# add_profile_visit(3,4)
# add_profile_visit(6,1)
# add_profile_visit(1,6)

# add_profile_like(1, 2)
# add_profile_like(1, 3)
# add_profile_like(3, 4)
# add_profile_like(6, 1)
# add_profile_like(1, 6)

# activate_user(2)
# activate_user(6)
# activate_user(2)
# activate_user(3)

# delete_image(6)

print(get_user_images(3))
# print(len(get_users()))
add_profile_activation_code(1, "ydtjkvhfivytxuyyfgciuyvtsyyrd")