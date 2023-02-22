from email.policy import default
from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser
from colorfield.fields import ColorField


# Custom user model for å legge til attributter for spiller.
# auth_user har allerede:
# id, username, password, email, first_name, last_name,
# is_superuser, is_staff, is_active, data_joined og last_login
class Spiller(AbstractUser):
    pass


class Spill(models.Model):
    class SpillType(models.TextChoices):
        MONOPOL = 'MPOL', 'Monopol'
        FIREPÅRAD = '4PRA', 'Fire på rad'

    spill_navn = models.CharField(
        max_length=25,
        help_text="Navn for å kjenne igjen spillet senere.",
    )
    spill_type = models.CharField(
        max_length=4,
        choices=SpillType.choices,
        default=SpillType.MONOPOL,
        help_text="Type spill",
    )
    spillere = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='SpillerISpill'
    )
    opprettet_tid = models.DateTimeField(auto_now_add=True)
    start_tid = models.DateTimeField(null=True, blank=True)
    slutt_tid = models.DateTimeField(null=True, blank=True)


class SpillerISpill(models.Model):
    spiller = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    spill = models.ForeignKey(
        Spill,
        on_delete=models.CASCADE
    )
    vert = models.BooleanField(
        default=False
    )
    farge = ColorField(default='#FF0000')
    plassering = models.SmallIntegerField()

    class Meta:
        unique_together = ['spiller', 'spill']

