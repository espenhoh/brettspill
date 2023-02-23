
from rest_flex_fields import FlexFieldsModelSerializer
from django.contrib.auth.models import Group
from .models import Spiller, Spill
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=Spiller.objects.all())]
    )

    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )

    password2 = serializers.CharField(
        write_only=True,
        required=True
    )

    class Meta:
        model = Spiller
        fields = ('username', 'password', 'password2', 'email')
        # extra_kwargs = {
        #     'first_name': {'required': True},
        #     'last_name': {'required': True}
        # }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Passord ikke like."}
            )
        return attrs

    def create(self, validated_data):
        spiller = Spiller.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )

        spiller.set_password(validated_data['password'])
        spiller.save()

        return spiller


class SpillerSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Spiller
        fields = ['url', 'username', 'email']


class GroupSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class SpillSerializer(FlexFieldsModelSerializer):

    spill_type_navn = serializers.SerializerMethodField(
        source='get_spill_type_navn'
    )

    class Meta:
        model = Spill
        fields = '__all__'
        expandable_fields = {
            'spillere': ('lobby.SpillerSerializer', {'many': True})
        }

    def get_spill_type_navn(self, spill):
        return spill.get_spill_type_display()
