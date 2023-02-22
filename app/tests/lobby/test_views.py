import pytest
import json

from django.test import TestCase

from lobby.models import Spill
from lobby.views import SpillViewSet

from django.urls import reverse
from rest_framework.test import APIRequestFactory

factory = APIRequestFactory()


def test_get_alle_spill_typer():
    viewset = SpillViewSet()
    request = factory.get(reverse('spill-get-alle-spill-typer'))
    response = viewset.get_alle_spill_typer(request)
    assert response.status_code == 200
    expected_spill_typer = {'MPOL': 'Monopol'}
    response_data = json.loads(response.data)
    for key, value in expected_spill_typer.items():
        assert key in response_data
        assert response_data[key] == value
