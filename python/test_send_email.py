import smtplib
from os import environ as env

EMAIL_ADDRESS = env.get('EMAIL_LOGIN')
EMAIL_PASSWORD = env.get('EMAIL_PASSWORD')



msg_subject = 'test the test'
msg_body = 'this email is a test. you can delete it'

with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
    smtp.ehlo()
    smtp.starttls()
    smtp.ehlo()
    smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)

    msg = f'Subject: {msg_subject}\n\n{msg_body}'

    smtp.sendmail(EMAIL_ADDRESS, EMAIL_ADDRESS, msg)


