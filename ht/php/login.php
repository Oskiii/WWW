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

        if(isset($params->loggedInUser) && $params->loggedInUser == "?"){
            $uid = "-1";
            $uname = "not found";
            if(isset($_SESSION["uid"]) && isset($_SESSION["username"])){
                $uid = $_SESSION["uid"];
                $uname = $_SESSION["username"];
            }
            return json_encode(array("uid"=>$uid, "uname"=>$uname));
        }
        
        // LOGIN
        if(isset($params->username) && isset($params->password)) {
            
            $response = array(
                "error" => false,
                "msg" => "Everything went fine.",
                "data" => ""
            );
            
            $prep = $db->prepare("SELECT uid, pwhash FROM users WHERE uname = :f1");
            $prep->execute(array(":f1" => $params->username));
            
            $result = $prep->fetchAll();

            if(count($result) < 1){
                $response["error"] = true;
                $response["msg"] = "Wrong username or password.";
            }else{
                $uid = $result[0]["uid"];
                $pwHash = $result[0]["pwhash"];
                $response["data"] = array("username"=>$params->username, "uid"=>$uid);
            
                if(!password_verify($params->password, $pwHash)){
                    $response["error"] = true;
                    $response["msg"] = "Wrong username or password.";
                }else{
                    $_SESSION["username"] = $params->username;
                    $_SESSION["uid"] = $uid;
                    $response["msg"] = $params->username;
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