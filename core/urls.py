from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('servicios/', views.ServiciosView.as_view(), name='servicios'),
    path('ubicacion/', views.UbicacionView.as_view(), name='ubicacion'),
    path('contacto/', views.ContactoView.as_view(), name='contacto'),
]
