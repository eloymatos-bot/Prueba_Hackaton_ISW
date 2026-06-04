-- Script de inicialización de la base de datos

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS proyecto_web;
USE proyecto_web;

-- Crear tabla de clientes
CREATE TABLE clientes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    servicio VARCHAR(100),
    mensaje TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


