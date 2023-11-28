# """
# Test module for the backend
# """
import hashlib
from io import BytesIO

import pytest
import json
import datetime
from flask_mongoengine import MongoEngine
import yaml
from app import create_app


# # # Pytest fixtures are useful tools for calling resources
# # # over and over, without having to manually recreate them,
# # # eliminating the possibility of carry-over from previous tests,
# # # unless defined as such.
# # # This fixture receives the client returned from create_app
# # # in app.py
@pytest.fixture



# 1. testing if the flask app is running properly
def test_alive(client):
    """
    Tests that the application is running properly

    :param client: mongodb client
    """
    rv = client.get("/")
    assert rv.data.decode("utf-8") == '{"message":"Server up and running"}\n'


# 2. testing if the search function running properly
def test_search(client):
    """
    Tests that the search is running properly

    :param client: mongodb client
    """
    rv = client.get("/search")
    jdata = json.loads(rv.data.decode("utf-8"))["label"]
    assert jdata == "successful test search"


# # # 3. testing if the application is getting data from database properly
# # def test_get_data(client, user):
# #     """
# #     Tests that using the application GET endpoint returns data

# #     :param client: mongodb client
# #     :param user: the test user object
# #     """
# #     user, header = user
# #     user["applications"] = []
# #     user.save()
# #     # without an application
# #     rv = client.get("/applications", headers=header)
# #     print(rv.data)
# #     assert rv.status_code == 200
# #     assert json.loads(rv.data) == []

# #     # with data
# #     application = {
# #         "jobTitle": "fakeJob12345",
# #         "companyName": "fakeCompany",
# #         "date": str(datetime.date(2021, 9, 23)),
# #         "status": "1",
# #     }
# #     user["applications"] = [application]
# #     user.save()
# #     rv = client.get("/applications", headers=header)
# #     print(rv.data)
# #     assert rv.status_code == 200
# #     assert json.loads(rv.data) == [application]


# # # 4. testing if the application is saving data in database properly
# # def test_add_application(client, mocker, user):
# #     """
# #     Tests that using the application POST endpoint saves data

# #     :param client: mongodb client
# #     :param user: the test user object
# #     """
# #     mocker.patch(
# #         # Dataset is in slow.py, but imported to main.py
# #         "app.get_new_user_id",
# #         return_value=-1,
# #     )
# #     user, header = user
# #     user["applications"] = []
# #     user.save()
# #     # mocker.patch(
# #     #     # Dataset is in slow.py, but imported to main.py
# #     #     'app.Users.save'
# #     # )
# #     rv = client.post(
# #         "/applications",
# #         headers=header,
# #         json={
# #             "application": {
# #                 "jobTitle": "fakeJob12345",
# #                 "companyName": "fakeCompany",
# #                 "date": str(datetime.date(2021, 9, 23)),
# #                 "status": "1",
# #             }
# #         },
# #     )
# #     assert rv.status_code == 200
# #     jdata = json.loads(rv.data.decode("utf-8"))["jobTitle"]
# #     assert jdata == "fakeJob12345"


# # # 5. testing if the application is updating data in database properly
# # def test_update_application(client, user):
# #     """
# #     Tests that using the application PUT endpoint functions

# #     :param client: mongodb client
# #     :param user: the test user object
# #     """
# #     user, auth = user
# #     application = {
# #         "id": 3,
# #         "jobTitle": "test_edit",
# #         "companyName": "test_edit",
# #         "date": str(datetime.date(2021, 9, 23)),
# #         "status": "1",
# #     }
# #     user["applications"] = [application]
# #     user.save()
# #     new_application = {
# #         "id": 3,
# #         "jobTitle": "fakeJob12345",
# #         "companyName": "fakeCompany",
# #         "date": str(datetime.date(2021, 9, 22)),
# #     }

# #     rv = client.put(
# #         "/applications/3", json={"application": new_application}, headers=auth
# #     )
# #     assert rv.status_code == 200
# #     jdata = json.loads(rv.data.decode("utf-8"))["jobTitle"]
# #     assert jdata == "fakeJob12345"


# # # 6. testing if the application is deleting data in database properly
# # def test_delete_application(client, user):
# #     """
# #     Tests that using the application DELETE endpoint deletes data

# #     :param client: mongodb client
# #     :param user: the test user object
# #     """
# #     user, auth = user

# #     application = {
# #         "id": 3,
# #         "jobTitle": "fakeJob12345",
# #         "companyName": "fakeCompany",
# #         "date": str(datetime.date(2021, 9, 23)),
# #         "status": "1",
# #     }
# #     user["applications"] = [application]
# #     user.save()

# #     rv = client.delete("/applications/3", headers=auth)
# #     jdata = json.loads(rv.data.decode("utf-8"))["jobTitle"]
# #     assert jdata == "fakeJob12345"


# # # 8. testing if the flask app is running properly with status code
# # def test_alive_status_code(client):
# #     """
# #     Tests that / returns 200

# #     :param client: mongodb client
# #     """
# #     rv = client.get("/")
# #     assert rv.status_code == 200


# # # Testing logging out does not return error
# # def test_logout(client, user):
# #     """
# #     Tests that using the logout function does not return an error

# #     :param client: mongodb client
# #     :param user: the test user object
# #     """
# #     user, auth = user
# #     rv = client.post("/users/logout", headers=auth)
# #     # assert no error occured
# #     assert rv.status_code == 200


# # def test_resume(client, mocker, user):
# #     """
# #     Tests that using the resume endpoint returns data

# #     :param client: mongodb client
# #     :param mocker: pytest mocker
# #     :param user: the test user object
# #     """
# #     mocker.patch(
# #         # Dataset is in slow.py, but imported to main.py
# #         "app.get_new_user_id",
# #         return_value=-1,
# #     )
# #     user, header = user
# #     user["applications"] = []
# #     user.save()
# #     data = dict(
# #         file=(BytesIO(b"testing resume"), "resume.txt"),
# #     )
# #     rv = client.post(
# #         "/resume", headers=header, content_type="multipart/form-data", data=data
# #     )
# #     assert rv.status_code == 200
# #     rv = client.get("/resume", headers=header)
# #     assert rv.status_code == 200

# # # def test_recommend_jobs(user):
# # #     """
# # #     Tests that the recommendation endpoint works and returns data
# # #     param
# # #     """
# # #     user, header = user
# # #     user["applications"] = []
# # #     user.save()
# # #     rv = client.get("/recommend", headers=header)
# # #     assert rv.status_code == 200

# import unittest
# from app import create_app

# class TestApp(unittest.TestCase):
#     def setUp(self):
#         self.app = create_app().test_client()
#         self.app.testing = True

#     def test_health_check(self):
#         response = self.app.get('/')
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(response.json['message'], 'Server up and running')

#     def test_signup(self):
#         # Test signing up a new user
#         payload = {
#             "username": "test_user",
#             "password": "test_password",
#             "fullName": "Test User",
#             "email": "test@example.com",
#             "skills": ["Python", "Flask"],
#             "education": "Test Education",
#             "workExperience": "Test Work Experience"
#         }
#         response = self.app.post('/users/signup', json=payload)
#         self.assertEqual(response.status_code, 200)
#         # Additional assertions based on the expected behavior of your app

#     def test_login(self):
#         # Test user login
#         payload = {
#             "username": "test_user",
#             "password": "test_password"
#         }
#         response = self.app.post('/users/login', json=payload)
#         self.assertEqual(response.status_code, 200)
#         # Additional assertions based on the expected behavior of your app

#     # Add more test cases for other endpoints as needed

# if __name__ == '__main__':
#     unittest.main()
# import unittest
# from unittest.mock import patch
# from app import create_app

# class TestApp(unittest.TestCase):
#     def setUp(self):
#         self.app = create_app().test_client()
#         self.app.testing = True

#     @patch('app.Users.objects')  # Mock the database interaction
#     def test_get_profile(self, mock_users_objects):
#         # Prepare mocked data
#         mock_user = {
#             "applications": [],
#             "username": "test_user",
#             "fullName": "Test User",
#             "email": "test@example.com",
#             "skills": ["Python", "Flask"],
#             "workExperience": "Test Work Experience",
#             "education": "Test Education"
#             # Add other fields as needed
#         }
#         # Mock the return value of Users.objects
#         mock_users_objects.return_value = [mock_user]

#         # Make a request to the endpoint that uses the mocked database
#         response = self.app.get('/users/profile',
#                                 headers={'Authorization': 'Bearer mock_token'})
        
#         # Assertions based on the expected behavior with mocked data
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(response.json['fullname'], 'Test User')
#         # Add more assertions as needed

# if __name__ == '__main__':
#     unittest.main()
