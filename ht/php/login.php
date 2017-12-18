<?php
    # Enable Error Reporting and Display:
    error_reporting(~0);
    ini_set('display_errors', 1);
    
    session_start();
    require_once("utils.php");

    try {
        $db = open_db_connection();
        $params = json_decode(file_get_contents('php://input'));
        
        // LOGIN
        if(isset($params->username) && isset($params->password)) {
            
            $response = array(
                "error" => false,
                "msg" => "Everything went fine.",
                "data" => ""
            );
            
            $prep = $db->prepare("SELECT uid, pwhash FROM users WHERE username = :f1");
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

        // GET USER BY ID
        if(isset($params->id)){
            $id = $params->id;
    
            if($id == -1){
                $prep = $db->prepare(
                    "SELECT * FROM `pictur`.`users`"
                );
                $prep->execute();
                
                $result = $prep->fetchAll();
                
                echo json_encode($result);
            }else{
                $prep = $db->prepare(
                    "SELECT * FROM `pictur`.`users` 
                    WHERE `uid` = :f1"
                );
                $prep->execute(array(":f1"=>$id));
                
                $result = $prep->fetchAll();
                
                echo json_encode($result);
            }
        }
    }
    catch(PDOException $e)
    {
        echo $e->getMessage();
    }
    exit();
?>