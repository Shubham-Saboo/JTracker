import unittest
from app import create_app
from unittest.mock import patch, MagicMock

from io import BytesIO
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
   

    def test_login(self):
        # Test user login
        payload = {
            "username": "test_user",
            "password": "test_password"
        }
        response = self.app.post('/users/login', json=payload)
        self.assertEqual(response.status_code, 200)
    


    @patch('app.Users.objects')
    def test_get_profile(self, mock_user_objects):
        # Mocking the Users.objects method to return a dummy user object
        dummy_user = {
            "applications": [
                {"status": '1'},
                {"status": '2'},
                {"status": '3'},
                {"status": '4'}
            ],
            "username": "test_user",
            "fullName": "Test User",
            "email": "test@example.com",
            "skills": ["Python", "Flask"],
            "workExperience": ["Test Work Experience"],
            "education": ["Test Education"]
        }
        mock_user_objects.return_value = MagicMock(first=lambda: dummy_user)

        response = self.app.get('/users/profile', headers={"Authorization": "Bearer mock_token"})
        self.assertEqual(response.status_code, 200)

        expected_stats = {
            'wishlist': 1,
            'applied': 1,
            'waiting_for_referral': 1,
            'rejected': 1,
            'username': 'test_user',
            'fullname': 'Test User',
            'email': 'test@example.com',
            'skills': ['Python', 'Flask'],
            'workExp': ['Test Work Experience'],
            'edu': ['Test Education']
        }
        self.assertEqual(response.json, expected_stats)


    @patch('app.requests.get')
    @patch('app.UserAgent.random')
    def test_search(self, mock_user_agent_random, mock_requests_get):
        
        mock_user_agent_random.return_value = "Mock User Agent"
        mock_requests_get.return_value.text = '<html>Mocked HTML content</html>'
        mock_requests_get.return_value.json = lambda: {"label": "successful test search"}

        response = self.app.get('/search?keywords=python')
        self.assertEqual(response.status_code, 200)
    

    @patch('app.Users.objects')
    def test_add_application(self, mock_user_objects):
    # Mocking the Users.objects method to return a dummy user object
        dummy_user = {
            "applications": [],
            "username": "test_user",
            "fullName": "Test User",
            "email": "test@example.com",
            "skills": ["Python", "Flask"],
            "workExperience": ["Test Work Experience"],
            "education": ["Test Education"]
        }
        mock_user_objects.return_value = MagicMock(first=lambda: dummy_user)

        # Test adding a new application
        payload = {
            "application": {
                "jobTitle": "Test Job",
                "companyName": "Test Company",
                "companyName": "abc",
                "date": "21/10/2000",
                "jobLink":"google.com",
                "location": "location",
                "status": 1,
                "reminder": 0,
               
            }
        }
        response = self.app.post('/applications',headers={"Authorization": "Bearer mock_token"}, json=payload)
        self.assertEqual(response.status_code, 500) 
        
#
    # @patch('app.Users.objects')
    # def test_upload_resume(self, mock_user_objects):
    #     mock_user = MagicMock()
    #     mock_user_objects.return_value = MagicMock(first=lambda: mock_user)
        
    #     # Assume you have a sample resume file in bytes
    #     sample_resume = b'Sample resume content'  # Replace with your sample resume file
        
    #     response = self.app.post('/resume', data={'file': (BytesIO(sample_resume), 'resume.pdf')}, headers={"Authorization": "Bearer mock_token"})
    #     self.assertEqual(response.status_code, 200)
    
    # @patch('app.Users.objects')
    # def test_get_resume(self, mock_user_objects):
    #     mock_user = MagicMock()
    #     mock_user.resume.read.return_value = b'Sample resume content'  # Replace with sample resume content in bytes
    #     mock_user_objects.return_value = MagicMock(first=lambda: mock_user)
        
    #     response = self.app.get('/resume', headers={"Authorization": "Bearer mock_token"})
    #     self.assertEqual(response.status_code, 200)

    @patch('app.get_userid_from_header')
    def test_get_resume_authorized(self, mock_get_userid):
        # Mock the behavior of get_userid_from_header to return a valid user ID
        mock_get_userid.return_value = 'valid_user_id'

        # Make a request to your endpoint that requires authorization
        with app.test_client() as client:
            response = client.get('/resume', headers={"Authorization": "Bearer mock_token"})

        # Assert the response status code to ensure authorization is successful
        self.assertEqual(response.status_code, 200)
    
    def test_upload_resume(self, mock_user_objects, mock_userid_from_header):
       # Mocking the Users.objects method to return a dummy user object
       dummy_user = {
           "resume": io.BytesIO(b"Test Resume"),
           "username": "test_user",
           "fullName": "Test User",
           "email": "test@example.com",
           "skills": ["Python", "Flask"],
           "workExperience": ["Test Work Experience"],
           "education": ["Test Education"]
       }
       mock_user_objects.return_value = MagicMock(first=lambda: dummy_user)

       # Test the /resume (POST) route
       with open('test_resume.pdf', 'rb') as f:
           response = self.app.post('/resume', headers={"Authorization": "Bearer mock_token"}, data={'file': f})
       self.assertEqual(response.status_code, 200)
       self.assertEqual(response.json['message'], 'resume successfully replaced')

    @patch('app.get_userid_from_header')
    @patch('app.Users.objects')
    def test_get_resume(self, mock_user_objects, mock_userid_from_header):
       # Mocking the Users.objects method to return a dummy user object
       dummy_user = {
           "resume": io.BytesIO(b"Test Resume"),
           "username": "test_user",
           "fullName": "Test User",
           "email": "test@example.com",
           "skills": ["Python", "Flask"],
           "workExperience": ["Test Work Experience"],
           "education": ["Test Education"]
       }
       mock_user_objects.return_value = MagicMock(first=lambda: dummy_user)

       # Test the /resume (GET) route
       response = self.app.get('/resume', headers={"Authorization": "Bearer mock_token"})
       self.assertEqual(response.status_code, 200)
       self.assertEqual(response.headers['x-filename'], 'resume.pdf')


    
    


    
        
    
    

       


    
      

if __name__ == '__main__':
    unittest.main()
