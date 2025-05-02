from django.core.management.base import BaseCommand
from waffle.models import Flag

WAFFLE_FLAGS = [
    {
        "name": "2fa_enabled",
        "everyone": False,
        "note": "Enable 2fa",
    },
    {
        "name": "trusted_ips_enabled",
        "everyone": True,
        "note": "Enable IP recognition for 2fa"
    }
]

DEFAULTS = {
    "percent": 0,
    "superusers": False,
    "staff": False,
    "authenticated": False,
    "rollout": False,
}

class Command(BaseCommand):
    help = "Initializes feature flags (Waffle)"

    def handle(self, *args, **kwargs):
        for flag_data in WAFFLE_FLAGS:
            data = {**DEFAULTS, **flag_data}
            flag, created = Flag.objects.get_or_create(
                name=data.pop('name'),
                defaults=data
            )
            if not created:
                self.stdout.write(self.style.SUCCESS(f'Flag "{flag.name}" already exists'))
            else:
                self.stdout.write(self.style.SUCCESS(f'Flag "{flag.name}" created'))
