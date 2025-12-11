from django.db import migrations

def seed_members(apps, schema_editor):
    MiembroEquipo = apps.get_model('portafolio_app', 'MiembroEquipo')
    members = [
        dict(nombre='José Jaramillo', cargo='Estudiante de Ingeniería de Sistemas y Computación',
             biografia='Mucho gusto mi nombre es José Jaramillo, estudiante de Ingeniería en Sistemas Computacionales y actualmente curso el cuarto año de la carrera. Me apasiona el desarrollo y diseño de sitios Webs. Mis metas incluyen convertirme en un profesional altamente capacitado, especializarme en desarrollador Web y contribuir a proyectos que transformen positivamente a la sociedad. Me considero una persona responsable, dedicada y en constante búsqueda de aprendizaje.',
             email='jose.jaramillo1@utp.ac.pa', telefono='+507 6824-2503',
             github='https://github.com/jose-jaramillo', linkedin='https://www.linkedin.com/in/jose-jaramillo'), 
        dict(nombre='René Ruiz', cargo='Estudiante de Ingeniería de Sistemas y Computación',
             biografia='Apasionado por la calidad de código, pruebas y DevOps moderno.',
             email='rene.ruiz@utp.ac.pa', telefono='+507 1000-0002',
             github='https://github.com/rene-ruiz', linkedin='https://www.linkedin.com/in/rene-ruiz'),
        dict(nombre='Valentín Rodríguez', cargo='Estudiante de Ingeniería de Sistemas y Computación',
             biografia='Mi nombre es Valentín Rodríguez y actualmente me encuentro en formación dentro de la carrera de Ingeniería de Sistemas y Computación. Me impulsa un fuerte deseo de aprender de manera continua, especialmente en áreas tecnológicas que evolucionan con rapidez y representan un reto intelectual. A futuro, aspiro a desarrollar conocimientos sólidos en ciberseguridad, con el propósito de proteger sistemas y datos, así como crear soluciones innovadoras que fortalezcan la seguridad en entornos digitales. Mi objetivo es complementar el aprendizaje teórico con práctica aplicada, para crecer profesionalmente y aportar valor al campo tecnológico.',
             email='valentin.rodriguez@utp.ac.pa', telefono='+507 1000-0003',
             github='https://github.com/valentin-rodriguez', linkedin='https://www.linkedin.com/in/valentin-rodriguez'),
        dict(nombre='José Monrroy', cargo='Estudiante de Ingeniería de Sistemas y Computación',
             biografia='Mi nombre es José Monroy De Gracia y actualmente me encuentro en formación en la carrera de Inegenieria de sistemas y computacion. Me motiva el deseo constante de aprender nuevas habilidades, especialmente en campos que evolucionan rápidamente y ofrecen desafíos intelectuales. En el futuro, deseo adquirir conocimientos sólidos en ciberseguridad, con el objetivo de proteger sistemas y datos, además de desarrollar soluciones innovadoras que contribuyan a un entorno digital más seguro. Mi meta es combinar aprendizaje constante con práctica aplicada para crecer profesionalmente y aportar valor en el mundo tecnológico.',
             email='jose.monrroy@utp.ac.pa', telefono='+507 1000-0004',
             github='https://github.com/jose-monrroy', linkedin='https://www.linkedin.com/in/jose-monrroy', foto='Materiales/FMonrroy.jpg'), 
    ]
    for m in members:
        MiembroEquipo.objects.get_or_create(nombre=m['nombre'], defaults=m)

def unseed_members(apps, schema_editor):
    MiembroEquipo = apps.get_model('portafolio_app', 'MiembroEquipo')
    MiembroEquipo.objects.filter(nombre__in=[
        'José Jaramillo', 'René Ruiz', 'Valentín Rodríguez', 'José Monrroy'
    ]).delete()

class Migration(migrations.Migration):
    dependencies = [
        ('portafolio_app', '0001_initial'),
    ]
    operations = [
        migrations.RunPython(seed_members, reverse_code=unseed_members),
    ]