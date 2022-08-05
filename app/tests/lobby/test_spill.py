from django.test import TestCase
from lobby.models import Spill


class AnimalTestCase(TestCase):
    def setUp(self):
        Spill.objects.create(spill_navn="test_spill", spill_type=Spill.SpillType.MONOPOL)

    def test_spill_er_monopol(self):
        test_spill = Spill.objects.get(spill_navn="test_spill")
        self.assertEqual(test_spill.spill_type, 'MONOPOL')
