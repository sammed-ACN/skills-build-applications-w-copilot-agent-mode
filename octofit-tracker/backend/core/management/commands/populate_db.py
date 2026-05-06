from django.core.management.base import BaseCommand
from core.models import Team, User, Activity, Leaderboard, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Delete existing data
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Team Marvel')
        dc = Team.objects.create(name='Team DC')

        # Create users (superheroes)
        ironman = User.objects.create_user(
            username='ironman', email='ironman@marvel.com', password='password',
            first_name='Tony', last_name='Stark', team=marvel
        )
        captain = User.objects.create_user(
            username='captain_america', email='captain@marvel.com', password='password',
            first_name='Steve', last_name='Rogers', team=marvel
        )
        spiderman = User.objects.create_user(
            username='spiderman', email='spiderman@marvel.com', password='password',
            first_name='Peter', last_name='Parker', team=marvel
        )
        batman = User.objects.create_user(
            username='batman', email='batman@dc.com', password='password',
            first_name='Bruce', last_name='Wayne', team=dc
        )
        superman = User.objects.create_user(
            username='superman', email='superman@dc.com', password='password',
            first_name='Clark', last_name='Kent', team=dc
        )
        wonderwoman = User.objects.create_user(
            username='wonderwoman', email='wonderwoman@dc.com', password='password',
            first_name='Diana', last_name='Prince', team=dc
        )

        # Create activities
        Activity.objects.create(user=ironman, type='run', duration=30, distance=5.0)
        Activity.objects.create(user=captain, type='cycle', duration=60, distance=20.0)
        Activity.objects.create(user=spiderman, type='swim', duration=45, distance=2.0)
        Activity.objects.create(user=batman, type='run', duration=40, distance=8.0)
        Activity.objects.create(user=superman, type='fly', duration=15, distance=100.0)
        Activity.objects.create(user=wonderwoman, type='run', duration=35, distance=7.0)

        # Create workouts
        Workout.objects.create(user=ironman, name='Iron Pushups', reps=100)
        Workout.objects.create(user=captain, name='Shield Throws', reps=50)
        Workout.objects.create(user=spiderman, name='Wall Crawls', reps=200)
        Workout.objects.create(user=batman, name='Bat Training', reps=150)
        Workout.objects.create(user=superman, name='Super Situps', reps=500)
        Workout.objects.create(user=wonderwoman, name='Lasso Training', reps=75)

        # Create leaderboard
        Leaderboard.objects.create(user=ironman, points=300)
        Leaderboard.objects.create(user=captain, points=280)
        Leaderboard.objects.create(user=spiderman, points=260)
        Leaderboard.objects.create(user=batman, points=290)
        Leaderboard.objects.create(user=superman, points=350)
        Leaderboard.objects.create(user=wonderwoman, points=310)

        self.stdout.write(self.style.SUCCESS('Database populated with superhero test data.'))
