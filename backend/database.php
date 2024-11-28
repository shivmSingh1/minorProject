<?php
// Database connection settings
$host = 'sql213.infinityfree.com'; // Database host
$username = 'if0_37764148'; // Database username
$password = '43LHGrCHn8kp'; // Database password
$dbname = 'if0_37764148_optlit'; // Database name

try {
    $conn = mysqli_connect($host, $username, $password, $dbname);
} catch (\Throwable $th) {
    die("Sorry something went wrong");
}
?>