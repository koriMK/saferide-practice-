import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_verification_email(email):
    """Send mock OTP verification email"""
    message = Mail(
        from_email='noreply@saferide.com',
        to_emails=email,
        subject='SafeRide - Verify Your Email',
        html_content=f'''
        <h2>Welcome to SafeRide!</h2>
        <p>Your verification OTP is: <strong>123456</strong></p>
        <p>This is a mock email for development purposes.</p>
        '''
    )
    
    try:
        sg = SendGridAPIClient(api_key=os.getenv('SENDGRID_API_KEY'))
        response = sg.send(message)
        return True
    except Exception as e:
        print(f"Email sending failed: {e}")
        return False