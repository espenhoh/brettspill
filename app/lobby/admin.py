from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.conf import settings

from .forms import SpillerRegistreringForm

from .models import Spiller, Spill, SpillerISpill

admin.site.site_header = "Lobby Admin"


# admin.register() decorator
@admin.register(Spill)
class SpillAdmin(admin.ModelAdmin):
    list_display = ('pk', 'spill_navn', 'spill_type', 'start_tid')


class SpillerAdmin(UserAdmin):
    add_form = SpillerRegistreringForm
    # form = CustomUserChangeForm
    model = settings.AUTH_USER_MODEL  # CustomUser
    # list_display = ('email', 'is_staff', 'is_active',)
    # list_filter = ('email', 'is_staff', 'is_active',)
    add_fieldsets = (
        (
            None,
            {
                'classes': ('wide',),
                'fields': (
                    'username',
                    'password1',
                    'password2',
                    'is_staff',
                    'is_active'
                )
            }
        ),
    )


admin.site.register(Spiller, SpillerAdmin)
# admin.site.register(Spill)
admin.site.register(SpillerISpill)

