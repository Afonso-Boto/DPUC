"""
Django settings for fetcher_search project.
"""

from pathlib import Path

# Build paths inside the project
CURRENT_DIR = Path(__file__).resolve().parent.name

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'rest_framework',
]

ROOT_URLCONF = ".".join([CURRENT_DIR, "urls"])

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ]
}
