import os
import sys

# Ruta al proyecto (donde está el archivo manage.py)
sys.path.insert(0, os.path.dirname(__file__))

# Configurar variables de entorno y configuración de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'everest_logistics.settings')

# Importar la aplicación WSGI de Django
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
