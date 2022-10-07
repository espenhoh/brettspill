import pytest

from django.test import TestCase


def test_call_view_allow_anonymous(db, client):
    response = client.get('/lobby/login', follow=True)
    assert response.status_code == 200
    response = client.post('/lobby/login', follow=True)
    assert response.status_code == 200


def test_call_view_load(db, client):
    client.login(username='admin', password='admin')  # defined in fixture or with factory in setUp()
    response = client.get('/lobby/login/')
    assert response.status_code == 200
    TestCase().assertRedirects(response, '/lobby/')


"""
class TestCalls(TestCase):
    def test_call_view_allow_anonymous(self):
        response = self.client.get('/lobby/login', follow=True)
        self.assertEqual(response.status_code, 200)
        response = self.client.post('/lobby/login', follow=True)
        self.assertEqual(response.status_code, 200)

    def test_call_view_load(self):
        self.client.login(username='admin', password='admin')  # defined in fixture or with factory in setUp()
        response = self.client.get('/lobby/login')
        self.assertEqual(response.status_code, 200)
        self.assertRedirects(response, '/lobby')

    @pytest.mark.skip(reason="todo")
    def test_call_view_fail_blank(self):
        self.client.login(username='user', password='test')
        response = self.client.post('/url/to/view', {}) # blank data dictionary
        self.assertFormError(response, 'form', 'some_field', 'This field is required.')
        # etc. ...

    @pytest.mark.skip(reason="todo")
    def test_call_view_fail_invalid(self):
        # as above, but with invalid rather than blank data in dictionary
        pass

    @pytest.mark.skip(reason="todo")
    def test_call_view_success_invalid(self):
        # same again, but with valid data, then
        self.assertRedirects(response, '/contact/1/calls/')
        """