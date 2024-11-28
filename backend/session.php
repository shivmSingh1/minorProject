<?php

header("Content-Type: application/json");

session_start();
if($_SERVER["REQUEST_METHOD"] === "GET"){
    if(isset($_SESSION["isLoggedIn"]) && $_SESSION["isLoggedIn"] === true){
        $response = [
            'status' => true,
            'username' => $_SESSION["name"]
        ];
        echo json_encode($response);
    }else{
        $response = ['status' => false, 'message' => 'Log In to continue'];
        echo json_encode($response);
    }
}
?>