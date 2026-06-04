from flask import Flask, render_template, request, jsonify
import mysql.connector
from mysql.connector import Error
from datetime import datetime

app = Flask(__name__)

# Configuración de MySQL
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'proyecto_web'
}

def get_db_connection():
    """Crea una conexión a la base de datos"""
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except Error as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/servicios')
def servicios():
    return render_template('servicios.html')

@app.route('/contacto', methods=['GET', 'POST'])
def contacto():
    if request.method == 'POST':
        # Obtener datos del formulario
        nombre = request.form.get('nombre')
        correo = request.form.get('correo')
        telefono = request.form.get('telefono')
        servicio = request.form.get('servicio')
        mensaje = request.form.get('mensaje')

        # Validar que todos los campos estén completos
        if not all([nombre, correo, telefono, servicio, mensaje]):
            return render_template('contacto.html', error='Todos los campos son requeridos')

        # Guardar en la base de datos
        connection = get_db_connection()
        if connection:
            try:
                cursor = connection.cursor()
                sql = """
                INSERT INTO clientes (nombre, correo, telefono, servicio, mensaje)
                VALUES (%s, %s, %s, %s, %s)
                """
                values = (nombre, correo, telefono, servicio, mensaje)
                cursor.execute(sql, values)
                connection.commit()
                
                print(f"Cliente guardado: {nombre} - {correo}")
                return render_template('contacto.html', success=True)
            
            except Error as e:
                print(f"Error al guardar cliente: {e}")
                # Manejar de forma segura errores específicos (ej: entrada duplicada de correo)
                if e.errno == 1062:
                    error_msg = "El correo electrónico ya se encuentra registrado."
                else:
                    error_msg = "Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde."
                return render_template('contacto.html', error=error_msg)
            
            finally:
                if connection.is_connected():
                    cursor.close()
                    connection.close()
        else:
            return render_template('contacto.html', error="Error al conectar a la base de datos")
    
    return render_template('contacto.html')

@app.route('/nosotros')
def nosotros():
    return render_template('nosotros.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
