<?php
session_start();
session_destroy();
$_SESSION = [];

$response = [
    'status' => true,
    'message' => 'Logout successful',
];
header("Content-Type: application/json");
echo json_encode($response);
?>