from django.contrib import admin
from waffle.admin import FlagAdmin, SwitchAdmin, SampleAdmin
from waffle.models import Flag, Switch, Sample

admin.site.register(Flag, FlagAdmin)
admin.site.register(Switch, SwitchAdmin)
admin.site.register(Sample, SampleAdmin)
