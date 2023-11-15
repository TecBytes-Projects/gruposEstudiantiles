<?php
// Configuración de las cabeceras CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Si la solicitud es OPTIONS, responde con 200 OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Resto del código de routes.php...

require_once 'controllers/AuthController.php';

$authController = new AuthController($conn);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    error_log('Recibida solicitud: ' . print_r($data, true));


    if (isset($data['action'])) {
        if ($data['action'] === 'login') {
            echo $authController->login($data['username'], $data['password']);
        }
    }
}
