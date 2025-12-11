from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('miembro/<int:pk>/', views.miembro_detalle, name='miembro_detalle'),
    path('contacto/', views.contacto, name='contacto'),
    path('proyectos/', views.proyectos, name='proyectos'),
    path('portafolio/', views.portafolio, name='portafolio'),
]