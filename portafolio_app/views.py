from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from .models import MiembroEquipo, Proyecto, Contacto

def index(request):
    miembros = MiembroEquipo.objects.all()
    proyectos_destacados = Proyecto.objects.filter(destacado=True)[:6]

    # Calculate total counts
    total_archivos = sum(miembro.archivos_trabajo.count() for miembro in miembros)
    total_proyectos = Proyecto.objects.count()

    context = {
        'miembros': miembros,
        'proyectos': proyectos_destacados,
        'total_archivos': total_archivos,
        'total_proyectos': total_proyectos,
    }
    return render(request, 'Principal.html', context)

def miembro_detalle(request, pk):
    miembro = get_object_or_404(MiembroEquipo, pk=pk)
    proyectos = miembro.proyectos.all()
    archivos = miembro.archivos_trabajo.all()
    context = {
        'miembro': miembro,
        'proyectos': proyectos,
        'archivos': archivos,
    }
    return render(request, 'Miembro_detalle.html', context)

def contacto(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        email = request.POST.get('email')
        asunto = request.POST.get('asunto')
        mensaje = request.POST.get('mensaje')
        if nombre and email and asunto and mensaje:
            Contacto.objects.create(
                nombre=nombre,
                email=email,
                asunto=asunto,
                mensaje=mensaje
            )
            messages.success(request, '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.')
            return redirect('index')
        else:
            messages.error(request, 'Por favor completa todos los campos.')
    return render(request, 'Contacto.html')

def proyectos(request):
    todos_proyectos = Proyecto.objects.all()
    context = {
        'proyectos': todos_proyectos,
    }
    return render(request, 'Principal.html', context)

def portafolio(request):
    miembros = MiembroEquipo.objects.all()
    total_archivos = sum(miembro.archivos_trabajo.count() for miembro in miembros)
    total_proyectos = Proyecto.objects.count()

    context = {
        'miembros': miembros,
        'total_archivos': total_archivos,
        'total_proyectos': total_proyectos,
    }
    return render(request, 'Portafolio.html', context)
