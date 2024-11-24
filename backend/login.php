<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    echo "Password = ". $_POST["password"];
}
?>
