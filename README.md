# Proyecto Web EC2-01

## Descripción
El servidor web (EC2-01) procesa las peticiones de los usuarios con Flask, renderiza las plantillas HTML y se comunica con la base de datos MySQL alojada en el servidor EC2-02 a través de la red privada en el puerto 3306.

## Características
- ✓ Frontend moderno con Tailwind CSS
- ✓ Backend con Python Flask
- ✓ Base de datos MySQL en servidor privado
- ✓ Comunicación segura entre servidores
- ✓ Estructura modular y escalable

## Estructura del Proyecto
```
static/
  css/           - Estilos CSS
  image/         - Imágenes del sitio
  js/            - Scripts JavaScript
templates/       - Plantillas HTML
database/        - Scripts SQL
app.py           - Aplicación Flask principal
requirements.txt - Dependencias de Python
```

## Instalación

1. Instalar dependencias:
```bash
pip install -r requirements.txt
```

2. Ejecutar la aplicación:
```bash
python app.py
```

La aplicación estará disponible en `http://localhost:5000`
