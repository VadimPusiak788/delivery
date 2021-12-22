# apply database migrations
python manage.py migrate

# create superuser, password is taken from DJANGO_SUPERUSER_PASSWORD
# source: https://stackoverflow.com/a/64050025
python manage.py createsuperuser \
    --no-input \
    --username "$DJANGO_SUPERUSER_USERNAME" \
    --email "$DJANGO_SUPERUSER_EMAIL"

# start server
gunicorn -b "0.0.0.0:8000" delivery.wsgi
