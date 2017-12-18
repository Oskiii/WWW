<?php
    # Enable Error Reporting and Display:
    error_reporting(~0);
    ini_set('display_errors', 1);
    
    session_start();
    require_once("utils.php");

    try {
        $db = open_db_connection();

        $params = json_decode(file_get_contents('php://input'));

        // REGISTER
        if(isset($params->username) 
        && isset($params->password) 
        && isset($params->firstname) 
        && isset($params->lastname)
        && isset($params->email)) {
            $response = array(
                "error" => false,
                "errorMsg" => "Everything went fine.",
                "data" => ""
            );

            $prep = $db->prepare("INSERT INTO users(uname, pwhash, firstname, lastname, email) VALUES(:f1, :f2, :f3, :f4, :f5)");
            
            $password = password_hash($params->password, PASSWORD_DEFAULT);
            
            $prep->execute(array(
                ":f1" => $params->username, 
                ":f2" => $password, 
                ":f3" => $params->firstname, 
                ":f4" => $params->lastname, 
                ":f5" => $params->email
            ));
            
            $response["data"] = "User created.";
            
            echo json_encode($response);
        }
    }
    catch(PDOException $e)
    {
        echo $e->getMessage();
    }
    exit();
?>