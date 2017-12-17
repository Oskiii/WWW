<?php
require("utils.php");
define("SAVE_PATH", "user_images/");

try {
    $db = new PDO(
        "mysql".
        ':host='.DB_SERVERNAME.
        ':'.DB_PORT.
        ';dbname='.DB_DBNAME,
        DB_USERNAME, 
        DB_PASSWORD);

    // set the PDO error mode to exception
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $params = json_decode(file_get_contents('php://input'));

    if(isset($_POST["name"]) && isset($_POST["uid"])){

        $title = $_POST["name"];

        $file_name = $_FILES['avatar']['name'];
        $file_type = $_FILES['avatar']['type'];
        $file_size = $_FILES['avatar']['size'];
        $file_tmp_name = $_FILES['avatar']['tmp_name'];
        
        $ownerid = $_POST["uid"];

        $timestamp = time();
        $folderPath = SAVE_PATH . $ownerid;

        $file_extension = get_file_extension($file_name);
        
        // If filepath doesn't exist, we need to create it
        // in order to move the image to it
        if (!is_dir($folderPath)) {
            mkdir($folderPath, 0777, true);
        }

        $filepath = $folderPath . "/" . $timestamp . $file_extension;
        
        if($file_name){
            move_uploaded_file($file_tmp_name, $filepath);
        }
        
        $prep = $db->prepare("INSERT INTO `pictur`.`images`
            (`uid`,
            `title`,
            `filepath`)
            VALUES
            (:f1,
            :f2,
            :f3);");
            
        $prep->execute(array(":f1"=>$ownerid, ":f2"=>$title, ":f3"=>$filepath));

        echo json_encode("upload success");
    }

    //echo json_encode($params->ids);
    if(isset($params->id)){
        $id = $params->id;

        if($id == -1){
            $prep = $db->prepare("SELECT * FROM `pictur`.`images`");
            $prep->execute();
            
            $result = $prep->fetchAll();
            
            echo json_encode($result);
        }else{
            $prep = $db->prepare("SELECT * FROM `pictur`.`images` WHERE imgid = :f1");
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