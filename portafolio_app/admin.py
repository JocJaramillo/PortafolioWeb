from django.contrib import admin
from .models import MiembroEquipo, Habilidad, Proyecto, Contacto, ArchivoTrabajo, Seccion

class ArchivoTrabajoInline(admin.TabularInline):
    model = ArchivoTrabajo
    extra = 1
    fields = ('seccion', 'archivo', 'descripcion', 'thumbnail')

class MiembroEquipoAdmin(admin.ModelAdmin):
    inlines = [ArchivoTrabajoInline]

admin.site.register(Habilidad)
admin.site.register(Proyecto)
admin.site.register(Contacto)
admin.site.register(Seccion)
admin.site.register(MiembroEquipo, MiembroEquipoAdmin)