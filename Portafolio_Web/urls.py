# Portafolio_Web/urls.py (VERSIÓN CORREGIDA)

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve # Necesario para servir MEDIA en producción

# 1. DEFINICIÓN ÚNICA Y COMPLETA DE URLSPATTERNS
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('portafolio_app.urls')),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)