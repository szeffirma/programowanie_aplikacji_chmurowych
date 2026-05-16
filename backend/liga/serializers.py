from rest_framework import serializers
from .models import Team, Player, Match, GoalStat

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    team_name = serializers.CharField(source='team.name', read_only=True)

    class Meta:
        model = Player
        fields = '__all__'

class GoalStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoalStat
        fields = '__all__'

class MatchSerializer(serializers.ModelSerializer):
    home_team_name = serializers.CharField(source='home_team.name', read_only=True)
    away_team_name = serializers.CharField(source='away_team.name', read_only=True)
    goal_stats = GoalStatSerializer(many=True, read_only=True)

    class Meta:
        model = Match
        fields = '__all__'