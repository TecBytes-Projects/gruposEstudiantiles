<?php
require_once __DIR__ . '/../config/database.php';

class UserModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function getUserByUsername($username) {
        $query = "SELECT * FROM users WHERE username = '$username'";
        error_log($query);
        $result = $this->conn->query($query);

        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        } else {
            return null;
        }
    }
}
