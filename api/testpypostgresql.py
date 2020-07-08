from app.Models import *



# add_user("user1", "user1@mail.com", "user1_firstname", "user1_lastname", "users1_strong_password")
# add_user("user2", "user2@mail.com", "user2_firstname", "user2_lastname", "users2_strong_password")
# add_user("user3", "user3@mail.com", "user3_firstname", "user3_lastname", "users3_strong_password")
# add_user("user4", "user4@mail.com", "user4_firstname", "user4_lastname", "users4_strong_password")
# add_user("user5", "user5@mail.com", "user5_firstname", "user5_lastname", "users5_strong_password")
# add_user("user6", "user6@mail.com", "user6_firstname", "user6_lastname", "users6_strong_password")

# add_image('475aacb3-4276-47cf-aaa3-dbfb39918881', "directory/to/the/image.jpg")
# add_image('dfbb1caa-0a99-4a7f-89bf-eed2ee3cddc3', "directory/to/the/image.jpg")
# add_image('475aacb3-4276-47cf-aaa3-dbfb39918881', "directory/to/the/image.jpg")
# add_image('c80275b0-0ada-4989-9b1a-9be8e93a1e4b', "directory/to/the/image.jpg")
# add_image('c80275b0-0ada-4989-9b1a-9be8e93a1e4b', "directory/to/the/image.jpg")


# set_biography('475aacb3-4276-47cf-aaa3-dbfb39918881', 'nice and short bio')
# set_gender('475aacb3-4276-47cf-aaa3-dbfb39918881', 'male')
# set_sexual_preference('475aacb3-4276-47cf-aaa3-dbfb39918881', 'female')
# set_profile_pic('475aacb3-4276-47cf-aaa3-dbfb39918881', 4 )
# set_profile_complete('475aacb3-4276-47cf-aaa3-dbfb39918881')
# set_profile_activated('475aacb3-4276-47cf-aaa3-dbfb39918881')

print(is_activated('475aacb3-4276-47cf-aaa3-dbfb39918881'))
print(is_completed('475aacb3-4276-47cf-aaa3-dbfb39918881'))
print(is_activated('dfbb1caa-0a99-4a7f-89bf-eed2ee3cddc3'))
print(is_completed('dfbb1caa-0a99-4a7f-89bf-eed2ee3cddc3'))


add_profile_visit('475aacb3-4276-47cf-aaa3-dbfb39918881', 'dfbb1caa-0a99-4a7f-89bf-eed2ee3cddc3')