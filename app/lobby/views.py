# views.py
import json
# REST things
from rest_framework.views import APIView
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from lobby.models import Spiller, Spill
from lobby.serializers import RegisterSerializer
from lobby.serializers import SpillSerializer
from lobby.serializers import SpillerSerializer
from rest_framework.decorators import action


class RegisterView(generics.CreateAPIView):
    queryset = Spiller.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class SpillerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Spiller.objects.all().order_by('-date_joined')
    serializer_class = SpillerSerializer
    permission_classes = []


class SpillViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Spill.objects.all()
    serializer_class = SpillSerializer
    permission_classes = []

    @action(detail=False)
    def get_alle_spill_typer(self, request):
        spilltyper = Spill.SpillType.choices
        my_choices_dict = [
            {
                'value': spilltype[0],
                'label': spilltype[1]
            }
            for spilltype in spilltyper
        ]
        return Response(my_choices_dict)
