<?php
// Configuración de la base de datos
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', '122469_rRfL$');
define('DB_NAME', 'my_database');

// Conexión a la base de datos
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}
