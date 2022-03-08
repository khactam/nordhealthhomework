This is a simple app of a store. You can add new product, delete, rearrange, filter etc products. You can also add product into cart and remove it it.

This project has Python3 Django rest framework as backend, Posgresql as database, Google cloud platform as a cloud service provider, Heroku as hosting middleware/UI and ReactJS as UI (AG Grid component).

LIVE DEMO: https://stark-oasis-51427.herokuapp.com/

## Local installation:

#### 1. Clone the project
#### 2. Open terminal -> Go to project directory -> cd backend/
#### 3. (install django) pip install django
#### 4. (install djangorestframework) pip install djangorestframework
#### 5. python manage.py runserver --> you should see it running at http://127.0.0.1:8000/
#### 6. Open another terminal -> cd client/
#### 7. npm install
#### 8. npm start
#### 9. Now you should see it's running. If you wish to connect to your own db instance, modify file backend/backend/settings.py

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'nhhomeworkdb',
        'USER': 'postgres',
        'PASSWORD': 'ao4dhkzOy5vN9epH',
        'HOST': '35.228.207.80',
        'PORT': '5432'
    }
}