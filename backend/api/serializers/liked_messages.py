from rest_framework import serializers
from api.models.liked_messages import LikedMessage


class LikedMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedMessage
        fields = '__all__'