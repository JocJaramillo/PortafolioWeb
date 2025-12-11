from django.db import models


class MiembroEquipo(models.Model):
    nombre = models.CharField(max_length=100)
    cargo = models.CharField(max_length=100)
    biografia = models.TextField()
    email = models.EmailField()
    telefono = models.CharField(max_length=20)
    foto = models.ImageField(upload_to='fotos_miembros/', blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.nombre


class Seccion(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True)
    orden = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['orden', 'nombre']
        verbose_name = 'Sección'
        verbose_name_plural = 'Secciones'

    def __str__(self):
        return self.nombre


class ArchivoTrabajo(models.Model):
    miembro = models.ForeignKey(MiembroEquipo, related_name='archivos_trabajo', on_delete=models.CASCADE)
    seccion = models.ForeignKey(Seccion, on_delete=models.CASCADE, help_text='Sección donde clasificar el archivo')
    archivo = models.FileField(upload_to='archivos_trabajo/')
    descripcion = models.CharField(max_length=255, blank=True)
    thumbnail = models.ImageField(upload_to='thumbnails/', blank=True, null=True)

    def __str__(self):
        return self.archivo.name

    class Meta:
        ordering = ['id']  # Ordena por el id (puedes cambiarlo por otro campo existente si lo prefieres)

orden = models.PositiveIntegerField(default=0)

class Habilidad(models.Model):
    miembro = models.ForeignKey(MiembroEquipo, on_delete=models.CASCADE, related_name='habilidades')
    nombre = models.CharField(max_length=50)
    porcentaje = models.IntegerField(default=0)

    class Meta:
        verbose_name = 'Habilidad'
        verbose_name_plural = 'Habilidades'

    def __str__(self):
        return f"{self.miembro.nombre} - {self.nombre}"

class Proyecto(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='projects/', blank=True, null=True)
    url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    tecnologias = models.CharField(max_length=200)
    miembros = models.ManyToManyField(MiembroEquipo, related_name='proyectos')
    fecha = models.DateField()
    destacado = models.BooleanField(default=False)

    @property
    def tecnologias_list(self):
        return [t.strip() for t in self.tecnologias.split(',') if t.strip()]

    class Meta:
        ordering = ['-fecha']
        verbose_name = 'Proyecto'
        verbose_name_plural = 'Proyectos'

    def __str__(self):
        return self.titulo

class Contacto(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    asunto = models.CharField(max_length=200)
    mensaje = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-fecha_creacion']
        verbose_name = 'Contacto'
        verbose_name_plural = 'Contactos'

    def __str__(self):
        return f"{self.nombre} - {self.asunto}"

