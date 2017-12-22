<?php
require("utils.php");
define("SAVE_PATH", "user_images/");

try {
    $db = open_db_connection();
    $params = json_decode(file_get_contents('php://input'));

    // DELETE IMAGE
    if(isset($params->id)){

        $id = $params->id;

        // Find image path and delete the file
        $prep = $db->prepare("SELECT `filepath` FROM `images` WHERE `images`.`imgid` = :f1");
        $prep->execute(array(":f1"=>$id));
        $result = $prep->fetchAll();

        $filepath = $result[0]["filepath"];

        if(file_exists($filepath)){
            unlink($filepath);
        }
        
        // Delete the DB record
        $prep = $db->prepare("DELETE FROM `images` WHERE `images`.`imgid` = :f1");
        $prep->execute(array(":f1"=>$id));

        echo json_encode("deletion success");
    }
}
catch(PDOException $e)
{
    echo $e->getMessage();
}

exit();

?>