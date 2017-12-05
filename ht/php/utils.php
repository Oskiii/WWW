<?php
# Enable Error Reporting and Display:
error_reporting(~0);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

define("DB_SERVERNAME", 'localhost');
define("DB_USERNAME", 'root');
define("DB_PASSWORD", "root");
define("DB_PORT", 8889);
define("DB_DBNAME", "pictur");

function get_file_extension($filename){
    $pos = strrpos($filename, '.');

    // No extension
    if ($pos === false) 
    {
        $ext = "";
    }
    else
    {
        $ext = substr($filename, $pos);
    }

    return $ext;
}
?>