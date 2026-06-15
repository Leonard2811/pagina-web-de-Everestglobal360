from django.views.generic import TemplateView


class HomeView(TemplateView):
    """Vista de la página principal."""
    template_name = 'core/home.html'


class ServiciosView(TemplateView):
    """Vista de la página de servicios."""
    template_name = 'core/servicios.html'


class UbicacionView(TemplateView):
    """Vista de la página de ubicación."""
    template_name = 'core/ubicacion.html'


class ContactoView(TemplateView):
    """Vista de la página de contacto."""
    template_name = 'core/contacto.html'
