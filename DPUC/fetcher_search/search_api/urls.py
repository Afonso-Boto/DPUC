from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
import search_api.views as views

urlpatterns = [
    path('search', views.search_dpuc)
]
