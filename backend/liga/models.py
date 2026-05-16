from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    points = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Player(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    number = models.IntegerField(null=True, blank=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Match(models.Model):
    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_matches')
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_matches')
    home_score = models.IntegerField(default=0)
    away_score = models.IntegerField(default=0)
    match_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.home_team} vs {self.away_team}"

class GoalStat(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name='goal_stats')
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='goal_stats')
    goals = models.IntegerField(default=0)