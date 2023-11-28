import unittest
from app import create_app
from unittest.mock import patch, MagicMock
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
        self.assertEqual(response.json, {"label": "successful test search"})
    
    @patch('app.Users.objects')
    def test_get_data(self, mock_user_objects):
        # Mocking the Users.objects method to return a dummy user object
        dummy_user = {"applications": [{"id": 1, "jobTitle": "Engineer", "companyName": "ABC Corp"}]}
        mock_user_objects.return_value = MagicMock(first=lambda: dummy_user)

        response = self.app.get('/applications', headers={"Authorization": "Bearer mock_token"})
        self.assertEqual(response.status_code, 200)
        # Add more assertions to check the response data based on the expected applications

    @patch('app.Users.objects')
    def test_add_application(self, mock_user_objects):
        # Mocking the Users.objects method to return a dummy user object
        dummy_user = {"applications": []}
        mock_user_objects.return_value = MagicMock(first=lambda: dummy_user)

        payload = {"application": {"jobTitle": "Software Developer", "companyName": "XYZ Inc"}}
        response = self.app.post('/applications', json=payload, headers={"Authorization": "Bearer mock_token"})
        self.assertEqual(response.status_code, 200)
        # Add more assertions to check the response data based on the added application

    @patch('app.Users.objects')
    def test_update_application(self, mock_user_objects):
        # Mocking the Users.objects method to return a dummy user object
        dummy_user = {"applications": [{"id": 1, "jobTitle": "Engineer", "companyName": "ABC Corp"}]}
        mock_user_objects.return_value = MagicMock(first=lambda: dummy_user)

        payload = {"application": {"jobTitle": "Senior Engineer"}}
        response = self.app.put('/applications/1', json=payload, headers={"Authorization": "Bearer mock_token"})
        self.assertEqual(response.status_code, 200)
        # Add more assertions to check the response data based on the updated application

    @patch('app.Users.objects')
    def test_delete_application(self, mock_user_objects):
        # Mocking the Users.objects method to return a dummy user object
        dummy_user = {"applications": [{"id": 1, "jobTitle": "Engineer", "companyName": "ABC Corp"}]}
        mock_user_objects.return_value = MagicMock(first=lambda: dummy_user)

        response = self.app.delete('/applications/1', headers={"Authorization": "Bearer mock_token"})
        self.assertEqual(response.status_code, 200)
       


    
      

if __name__ == '__main__':
    unittest.main()
