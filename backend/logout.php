<?php
header('Access-Control-Allow-Origin: http://localhost:5173'); // Allow requests from your frontend
header('Access-Control-Allow-Methods: POST, OPTIONS'); // Allow POST and OPTIONS methods (important for preflight)
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow Content-Type and any other necessary headers
header('Access-Control-Max-Age: 86400'); // Cache the preflight response for 1 day (optional but recommended)

session_start();
session_unset();
session_destroy();


?>