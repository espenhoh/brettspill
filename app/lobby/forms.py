from django.contrib.auth.forms import UserCreationForm
from .models import Spiller


class SpillerRegistreringForm(UserCreationForm):
    # email = forms.EmailField()

    class Meta(UserCreationForm.Meta):
        model = Spiller
        fields = UserCreationForm.Meta.fields + ('email', )
