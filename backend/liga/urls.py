from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'teams', views.TeamViewSet)
router.register(r'players', views.PlayerViewSet)
router.register(r'matches', views.MatchViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('stats/best-team/', views.best_team),
    path('stats/best-player/', views.best_player),
    path('stats/best-player-vs/<int:team_id>/', views.best_player_vs),
]