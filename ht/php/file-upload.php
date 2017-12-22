<?php
require("utils.php");
define("SAVE_PATH", "user_images/");

try {
    $db = open_db_connection();
    $params = json_decode(file_get_contents('php://input'));

    // UPLOAD IMAGE
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
        
        // Save file to disk
        if($file_name){
            move_uploaded_file($file_tmp_name, $filepath);
        }
        
        // Push file data to DB
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

    // GET IMAGE(S)
    if(isset($params->id)){
        $id = $params->id;

        // Get all images if id = -1
        if($id == -1){
            $prep = $db->prepare(
                "SELECT * FROM `pictur`.`images` 
                JOIN `pictur`.`users` 
                ON (`pictur`.`images`.`uid` = `pictur`.`users`.`uid`)"
            );
            $prep->execute();
            
            $result = $prep->fetchAll();
            
            echo json_encode($result);
        }else{
            // Get image by id
            $prep = $db->prepare(
                "SELECT * FROM `pictur`.`images` 
                JOIN `pictur`.`users` 
                ON (`pictur`.`images`.`uid` = `pictur`.`users`.`uid`)
                WHERE imgid = :f1"
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