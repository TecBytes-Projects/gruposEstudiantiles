<?php
// AuthController.php
require_once __DIR__ . '/../models/UserModel.php';

class AuthController {
    private $userModel;

    public function __construct($conn) {
        $this->userModel = new UserModel($conn);
    }

    public function login($username, $password) {
        $user = $this->userModel->getUserByUsername($username);
        error_log($password);
        error_log($user['password']);
        if ($password == $user['password']) {
            // Usuario autenticado
            return json_encode(['message' => 'Login exitoso']);
        } else {
            // Error de autenticación
            return json_encode(['error' => 'Usuario o contraseña incorrectos']);
        }
    }
}
