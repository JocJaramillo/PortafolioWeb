from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from portafolio_app.models import ArchivoTrabajo
import os
from PIL import Image, ImageDraw, ImageFont
import io


class Command(BaseCommand):
    help = 'Generate thumbnails for PDF files that don\'t have them'

    def handle(self, *args, **options):
        archivos = ArchivoTrabajo.objects.filter(thumbnail__isnull=True)

        for archivo in archivos:
            if archivo.archivo and archivo.archivo.name.lower().endswith('.pdf'):
                self.stdout.write(f'Processing: {archivo.archivo.name}')

                try:
                    # Create a simple thumbnail with PDF name
                    img = Image.new('RGB', (300, 120), color='#f8f9fa')
                    draw = ImageDraw.Draw(img)

                    # Draw a red header like the PDF preview
                    draw.rectangle([0, 0, 300, 30], fill='#dc3545')

                    # Draw some lines to simulate text
                    draw.rectangle([10, 40, 250, 45], fill='#6c757d')
                    draw.rectangle([10, 55, 200, 60], fill='#6c757d')
                    draw.rectangle([10, 70, 180, 75], fill='#6c757d')

                    # Draw PDF icon
                    draw.ellipse([250, 80, 280, 110], fill='#dc3545')

                    # Save to memory
                    thumb_io = io.BytesIO()
                    img.save(thumb_io, format='JPEG', quality=85)
                    thumb_io.seek(0)

                    # Generate filename
                    filename = f"{os.path.splitext(os.path.basename(archivo.archivo.name))[0]}_thumb.jpg"

                    # Save thumbnail
                    archivo.thumbnail.save(filename, ContentFile(thumb_io.getvalue()), save=True)

                    self.stdout.write(
                        self.style.SUCCESS(f'Successfully created thumbnail for {archivo.archivo.name}')
                    )

                except Exception as e:
                    self.stdout.write(
                        self.style.ERROR(f'Error processing {archivo.archivo.name}: {str(e)}')
                    )

        self.stdout.write(self.style.SUCCESS('Thumbnail generation completed!'))