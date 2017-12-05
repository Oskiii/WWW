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

        // REGISTER
        if(isset($_POST["regUsername"]) && isset($_POST["regPassword"]) && isset($_POST["regPassword2"])) {
            $response = array(
                "error" => false,
                "errorMsg" => "Everything went fine.",
                "data" => ""
            );
            
            if($_POST["regPassword"] === $_POST["regPassword2"]){
                $prep = $db->prepare("INSERT INTO users(username, pwhash) VALUES(:f1, :f2)");
                
                $password = password_hash($_POST["regPassword"], PASSWORD_DEFAULT);
                
                $prep->execute(array(":f1" => $_POST["regUsername"], ":f2" => $password));
                
                $response["data"] = "User created.";
            }else{
                $response["error"] = true;
                $response["errorMsg"] = "Passwords don't match.";
            }
            
            echo json_encode($response);
        }
        
        // LOGIN
        if(isset($_POST["logUsername"]) && isset($_POST["logPassword"])) {
            
            $response = array(
                "error" => false,
                "errorMsg" => "Everything went fine.",
                "data" => ""
            );
            
            $prep = $db->prepare("SELECT uid, pwhash FROM users WHERE username = :f1");
            $prep->execute(array(":f1" => $_POST["logUsername"]));
            
            $result = $prep->fetchAll();

            if(count($result) < 1){
                $response["error"] = true;
                $response["errorMsg"] = "Wrong username or password.";
            }else{
                $uid = $result[0]["uid"];
                $pwHash = $result[0]["pwhash"];
                $response["data"] = array("username"=>$_POST["logUsername"]);
            
                if(!password_verify($_POST["logPassword"], $pwHash)){
                    $response["error"] = true;
                    $response["errorMsg"] = "Wrong username or password.";
                }else{
                    $_SESSION["username"] = $_POST["logUsername"];
                    $_SESSION["uid"] = $uid;
                }
            }
            
            echo json_encode($response);
        }
    }
    catch(PDOException $e)
    {
        echo $sql . "<br>" . $e->getMessage();
    }
    exit();
?>