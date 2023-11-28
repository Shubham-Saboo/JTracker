import unittest
from app import create_app

class TestApp(unittest.TestCase):
    def setUp(self):
        self.app = create_app().test_client()
        self.app.testing = True

    def test_health_check(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['message'], 'Server up and running')

    def test_signup(self):
        # Test signing up a new user
        payload = {
            "username": "test_user",
            "password": "test_password",
            "fullName": "Test User",
            "email": "test@example.com",
            "skills": ["Python", "Flask"],
            "education": ["Test Education"],
            "workExperience": ["Test Work Experience"]
        }
        response = self.app.post('/users/signup', json=payload)
        self.assertEqual(response.status_code, 200)
        # Additional assertions based on the expected behavior of your app

    def test_login(self):
        # Test user login
        payload = {
            "username": "test_user",
            "password": "test_password"
        }
        response = self.app.post('/users/login', json=payload)
        self.assertEqual(response.status_code, 200)
        # Additional assertions based on the expected behavior of your app

    # Add more test cases for other endpoints as needed

if __name__ == '__main__':
    unittest.main()
