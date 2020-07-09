def send_registration_activation_email(username, email_address, user_id, activation_code):
    print('sending email... ')
    msg = f'''Welcome {username} to Matcha  
    You can click the link below to activate your account and start meeting some people:
    
    https://localhost:3000/activate/my/account/{activation_code}/thanks
    
    
    enjoy'''

    subject = 'Welcome to matcha'

    send_email(email_address, subject, msg)
    return

def send_login_notification(email):
    return



import smtplib
from os import environ as env

def send_email(to_addr, subject, message):
    
    EMAIL_ADDRESS = env.get('EMAIL_LOGIN')
    EMAIL_PASSWORD = env.get('EMAIL_PASSWORD')

    with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
        smtp.ehlo()
        smtp.starttls()
        smtp.ehlo()
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)

        msg = f'Subject: {subject}\n\n{message}'

        smtp.sendmail(EMAIL_ADDRESS, to_addr, msg)



