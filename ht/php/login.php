<?php
    # Enable Error Reporting and Display:
    error_reporting(~0);
    ini_set('display_errors', 1);
    
    session_start();
    require_once("utils.php");

    require_once 'vendor/autoload.php';
    
    try {
        $db = open_db_connection();
        $params = json_decode(file_get_contents('php://input'));

        // Method defines login method, e.g. password, google, facebook...
        if(isset($params->method)){

            $response = array(
                "error" => false,
                "msg" => "Everything went fine.",
                "data" => ""
            );

            // Handle password login
            if($params->method == "password"){
                if(isset($params->username) && isset($params->password)) {
                    
                    $prep = $db->prepare("SELECT * FROM users WHERE username = :f1");
                    $prep->execute(array(":f1" => $params->username));
                    
                    $result = $prep->fetchAll();

                    if(count($result) < 1){
                        $response["error"] = true;
                        $response["msg"] = "Wrong username or password.";
                    }else{
                        $uid = $result[0]["uid"];
                        $pwHash = $result[0]["pwhash"];
                        //$response["data"] = array("username"=>$params->username, "uid"=>$uid);
                        $response["data"] = $result[0];
                    
                        if(!password_verify($params->password, $pwHash)){
                            $response["error"] = true;
                            $response["msg"] = "Wrong username or password.";
                        }else{
                            // $_SESSION["username"] = $params->username;
                            // $_SESSION["uid"] = $uid;
                            $response["msg"] = $params->username;
                        }
                    }                    
                }
            } // Handle Google login
            else if($params->method == "google" && isset($params->id_token)){
                $client = new Google_Client(['client_id' => GOOGLE_CLIENT_ID]);
                $payload = $client->verifyIdToken($params->id_token);
                if ($payload) {
                    $userid = $payload['sub'];

                    $prep = $db->prepare("SELECT * FROM users WHERE socialid = :f1");
                    $prep->execute(array(":f1" => $payload["sub"]));
                    $result = $prep->fetchAll();

                    if(count($result) != 0){
                        // User has logged in before
                        $response["msg"] = "User has logged in before";
                    }else{
                        $prep = $db->prepare("INSERT INTO users(username, loginmethod, socialid, firstname, lastname, email) VALUES(:f1, :f2, :f3, :f4, :f5, :f6)");
                        $prep->execute(array(
                            ":f1" => $payload["name"], 
                            ":f2" => "google", 
                            ":f3" => $payload["sub"],
                            ":f4" => $payload["given_name"], 
                            ":f5" => $payload["family_name"], 
                            ":f6" => $payload["email"]
                        ));

                        $response["msg"] = "User has never logged in before";
                    }

                    // Fetch users UID and merge it to data array
                    $prep = $db->prepare("SELECT uid, role FROM users WHERE socialid = :f1");
                    $prep->execute(array(":f1" => $payload["sub"]));
                    $result = $prep->fetchAll();

                    $payload = array_merge($payload, array("uid"=>+$result[0]["uid"], "role"=>$result[0]["role"]));
                    $response["data"] = $payload;
                } else {
                    // Invalid ID token
                    $response["error"] = true;
                    $response["msg"] = "Invalid ID token.";
                }
            }
            echo json_encode($response);
        }

        // GET USER BY ID
        if(isset($params->id)){
            $id = $params->id;
    
            // Get all images if id is -1
            if($id == -1){
                $prep = $db->prepare(
                    "SELECT * FROM `pictur`.`users`"
                );
                $prep->execute();
                
                $result = $prep->fetchAll();
                
                echo json_encode($result);
            }else{
                // Get image data by id
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