<?php
header('Content-Type: application/json');

// Database connection settings
$host = 'localhost'; // Database host
$dbname = 'optlit'; // Database name
$username = 'root'; // Database username
$password = ''; // Database password

// Establish a connection
$conn = mysqli_connect($host, $username, $password, $dbname);

// Check the connection
if (!$conn) {
    // Return error details as JSON
    echo json_encode([
        "success" => false,
        "error" => "Connection failed",
        "details" => mysqli_connect_error()
    ]);
    exit; // Stop further execution
}
?>