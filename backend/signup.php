<?php
require_once 'database.php';

// Sets the HTTP response header to indicate the content type of the response is JSON
header("Content-Type: application/json");

// Retrieves and decodes the JSON data from the request body into a PHP associative array
$inputData = json_decode(file_get_contents("php://input"), true);

// Check if the necessary fields are provided
if (!isset($inputData['fullname']) || !isset($inputData['email']) || !isset($inputData['password'])) {
    echo json_encode(["success" => false, "error" => "Missing required fields"]);
    exit;
}

// Checks if a user with the given email exists in the database
function isEmailExists($email, $conn)
{
    $sql = "SELECT 1 FROM users WHERE email = ? LIMIT 1"; // SQL query to check for existence of email
    $stmt = mysqli_prepare($conn, $sql); // Prepares the SQL statement
    mysqli_stmt_bind_param($stmt, "s", $email); // Binds the email parameter to the prepared statement
    mysqli_stmt_execute($stmt); // Executes the statement
    mysqli_stmt_store_result($stmt); // Stores the result to enable checking the number of rows
    $exists = mysqli_stmt_num_rows($stmt) > 0; // Determines if any row exists (true if the email exists)
    mysqli_stmt_close($stmt); // Closes the prepared statement
    return $exists; // Returns true if the email exists, otherwise false
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
    session_start();
    $_SESSION['name'] = $fullname;
    $_SESSION['isLoggedIn'] = true;
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Something Went Wrong, Its Server Issue"]);
}
