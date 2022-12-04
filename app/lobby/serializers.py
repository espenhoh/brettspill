from django.contrib.auth.models import Group
from .models import Spiller
from rest_framework import serializers


class SpillerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Spiller
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']