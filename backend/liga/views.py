from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum, F
from .models import Team, Player, Match, GoalStat
from .serializers import TeamSerializer, PlayerSerializer, MatchSerializer, GoalStatSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by('-points')
    serializer_class = TeamSerializer

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all().order_by('-match_date')
    serializer_class = MatchSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        goal_stats = data.get('goal_stats', [])

        match = Match.objects.create(
            home_team_id=data['home_team'],
            away_team_id=data['away_team'],
            home_score=data['home_score'],
            away_score=data['away_score'],
            match_date=data.get('match_date')
        )

        home_score = int(data['home_score'])
        away_score = int(data['away_score'])
        if home_score > away_score:
            Team.objects.filter(id=data['home_team']).update(points=F('points') + 3)
        elif away_score > home_score:
            Team.objects.filter(id=data['away_team']).update(points=F('points') + 3)
        else:
            Team.objects.filter(id=data['home_team']).update(points=F('points') + 1)
            Team.objects.filter(id=data['away_team']).update(points=F('points') + 1)

        for gs in goal_stats:
            if int(gs.get('goals', 0)) > 0:
                GoalStat.objects.create(match=match, player_id=gs['player_id'], goals=gs['goals'])

        return Response(MatchSerializer(match).data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def best_team(request):
    team = Team.objects.order_by('-points').first()
    return Response(TeamSerializer(team).data if team else {})

@api_view(['GET'])
def best_player(request):
    result = GoalStat.objects.values('player').annotate(total=Sum('goals')).order_by('-total').first()
    if not result:
        return Response({})
    player = Player.objects.get(id=result['player'])
    data = PlayerSerializer(player).data
    data['total_goals'] = result['total']
    return Response(data)

@api_view(['GET'])
def best_player_vs(request, team_id):
    result = GoalStat.objects.filter(
        match__home_team_id=team_id
    ).exclude(player__team_id=team_id).values('player').annotate(total=Sum('goals')).order_by('-total').first()

    if not result:
        result = GoalStat.objects.filter(
            match__away_team_id=team_id
        ).exclude(player__team_id=team_id).values('player').annotate(total=Sum('goals')).order_by('-total').first()

    if not result:
        return Response({})

    player = Player.objects.get(id=result['player'])
    data = PlayerSerializer(player).data
    data['total_goals'] = result['total']
    return Response(data)