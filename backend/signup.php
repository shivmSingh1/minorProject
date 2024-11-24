<?php
require_once 'database.php';

header('Access-Control-Allow-Origin: http://localhost:5173'); // Allow requests from your frontend
header('Access-Control-Allow-Methods: POST, OPTIONS'); // Allow POST and OPTIONS methods (important for preflight)
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow Content-Type and any other necessary headers
header('Access-Control-Max-Age: 86400'); // Cache the preflight response for 1 day (optional but recommended)

header("Content-Type: application/json");

// Get the raw POST data (because we’re sending JSON)
$inputData = json_decode(file_get_contents("php://input"), true);

// Check if the necessary fields are provided
if (!isset($inputData['fullname']) || !isset($inputData['email']) || !isset($inputData['password'])) {
    echo json_encode(["success" => false, "error" => "Missing required fields"]);
    exit;
}

function isEmailExists($email, $conn)
{

    $sql = "SELECT 1 FROM users WHERE email = ? LIMIT 1";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);

    $exists = mysqli_stmt_num_rows($stmt) > 0;

    mysqli_stmt_close($stmt);
    return $exists;
}

if (isEmailExists($inputData['email'], $conn)) {
    echo json_encode(["success" => false, "error" => "Email Already Exists"]);
    exit;
}

$fullname = $inputData['fullname'];
$email = $inputData['email'];
$hash = password_hash($inputData['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO `users` (`fullname`, `email`, `hash`) VALUES ('$fullname', '$email', '$hash')";
$result = mysqli_query($conn, $sql);
if ($result) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Something Went Wrong, Its Server Issue"]);
}