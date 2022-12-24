from django.contrib.auth.models import Group
from .models import Spiller, Spill
from rest_framework import serializers


class SpillerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Spiller
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class SpillSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Spill
        fields = '__all__'
