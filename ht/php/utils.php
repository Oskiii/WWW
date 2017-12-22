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

define("GOOGLE_CLIENT_ID", "1087314749986-a4m6fqbter0j8248kmapt6ghhrnar1h9.apps.googleusercontent.com");

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

function open_db_connection(){
    return new PDO(
        "mysql".
        ':host='.DB_SERVERNAME.
        ':'.DB_PORT.
        ';dbname='.DB_DBNAME,
        DB_USERNAME, 
        DB_PASSWORD);
}

function p2console( $object=null, $label=null ){ 
    $message = json_encode($object, JSON_PRETTY_PRINT); 
    $label = "Debug" . ($label ? " ($label): " : ': '); 
    echo "<script>console.log(\"$label\", $message);</script>"; 
}
?>