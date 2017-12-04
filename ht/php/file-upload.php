<?php
require("utils.php");
define("SAVE_PATH", "./user_images/");

try {
    $db = new PDO(
        "mysql".
        ':host='.DB_SERVERNAME.
        ';dbname='.DB_DBNAME,
        DB_USERNAME, 
        DB_PASSWORD);

    // set the PDO error mode to exception
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $params = file_get_contents('php://input');
    $title = $_POST["name"];

    $file_name = $_FILES['avatar']['name'];
    $file_type = $_FILES['avatar']['type'];      
    $file_size = $_FILES['avatar']['size'];
    $file_tmp_name = $_FILES['avatar']['tmp_name'];
    
    if($file_name){
        move_uploaded_file($file_tmp_name,"user_images/" . $file_name);
    }

    echo json_encode("upload success");

    // ADD NOTE
    if(isset($_POST["sdfsd"]) && isset($_SESSION["uid"])){

        $prep = $db->prepare("INSERT INTO `pictur`.`images`
            (`uid`,
            `note`,
            `notetime`)
            VALUES
            (:f1,
            :f2,
            NOW());");
            
        $prep->execute(array(":f1"=>$_SESSION["uid"], ":f2"=>$_POST["note"]));
    }
}
catch(PDOException $e)
{
    echo $e->getMessage();
}

$db = null;
exit();

?>