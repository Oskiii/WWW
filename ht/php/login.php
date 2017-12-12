<?php
    # Enable Error Reporting and Display:
    error_reporting(~0);
    ini_set('display_errors', 1);
    
    session_start();
    require_once("utils.php");

    try {
        $db = new PDO(
            "mysql".
            ':host='.DB_SERVERNAME.
            ';dbname='.DB_DBNAME,
            DB_USERNAME, 
            DB_PASSWORD);

        // set the PDO error mode to exception
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $params = json_decode(file_get_contents('php://input'));
        
        // LOGIN
        if(isset($params->username) && isset($_params->password)) {
            
            $response = array(
                "error" => false,
                "errorMsg" => "Everything went fine.",
                "data" => ""
            );
            
            $prep = $db->prepare("SELECT uid, pwhash FROM users WHERE username = :f1");
            $prep->execute(array(":f1" => $params->username));
            
            $result = $prep->fetchAll();

            if(count($result) < 1){
                $response["error"] = true;
                $response["errorMsg"] = "Wrong username or password.";
            }else{
                $uid = $result[0]["uid"];
                $pwHash = $result[0]["pwhash"];
                $response["data"] = array("username"=>$params->username);
            
                if(!password_verify($params->password, $pwHash)){
                    $response["error"] = true;
                    $response["errorMsg"] = "Wrong username or password.";
                }else{
                    $_SESSION["username"] = $params->username;
                    $_SESSION["uid"] = $uid;
                }
            }
            
            echo json_encode($response);
        }
    }
    catch(PDOException $e)
    {
        echo $e->getMessage();
    }
    exit();
?>