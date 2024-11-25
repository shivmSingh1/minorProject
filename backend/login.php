<?php
session_start();
require_once 'database.php';

header('Access-Control-Allow-Origin: http://localhost:5173'); // Allow requests from your frontend
header('Access-Control-Allow-Methods: POST, OPTIONS'); // Allow POST and OPTIONS methods (important for preflight)
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow Content-Type and any other necessary headers
header('Access-Control-Max-Age: 86400'); // Cache the preflight response for 1 day (optional but recommended)

// Sets the HTTP response header to indicate the content type of the response is JSON
header("Content-Type: application/json");

// Retrieves and decodes the JSON data from the request body into a PHP associative array
$inputData = json_decode(file_get_contents("php://input"), true);
$email = $inputData["email"];
$password = $inputData["password"];

// Check if the necessary fields are provided
if (!isset($email) || !isset($password)) {
    echo json_encode(["status" => false, "message" => "Missing required fields"]);
    exit;
}

// Prepare the SQL query
$stmt = mysqli_prepare($conn, "SELECT * FROM `users` WHERE `email` = ?");
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt); // Execute the statement
$result = mysqli_stmt_get_result($stmt); // Get the result

$userData = mysqli_fetch_assoc($result);

if ($userData) {
    // Verify the password
    if (password_verify($password, $userData['hash'])) {
        // Password is correct
        $response = [
            'status' => true,
            'message' => 'Login successful!',
            'name' => $userData['fullname']
        ];
        $_SESSION['name'] = $userData['fullname'];
        $_SESSION['isLoogedIn'] = true;
    } else {
        // Password is incorrect
        $response = [
            'status' => false,
            'message' => 'Invalid Email Or Password!'
        ];
    }
} else {
    // Email not found
    $response = [
        'status' => false,
        'message' => 'Invalid Email Or Password!'
    ];
}

// Close statement and result
mysqli_free_result($result);
mysqli_stmt_close($stmt);

// Send response (as JSON for an API or modify as needed)
echo json_encode($response);
?>
