import pytz
from django.test import TestCase
from lobby.models import Spiller, Spill
from lobby.models import Spill
from datetime import datetime


class AnimalTestCase(TestCase):
    def setUp(self):
        Spiller.objects.create(
            username="testuser",
            email="test@user.test",
            first_name="Test",
            last_name="Name"
        )

        tz_oslo = pytz.timezone('Europe/Oslo')
        nå = datetime.now(tz=tz_oslo)
        Spill.objects.create(
            spill_navn="test_spill",
            spill_type=Spill.SpillType.MONOPOL,
            start_tid=nå,
            slutt_tid=nå
        )

    def test_spill_er_monopol(self):
        test_spill = Spill.objects.get(spill_navn="test_spill")
        assert test_spill.spill_type == 'MPOL'
