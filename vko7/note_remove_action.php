<?php
    header('Location: noteapp.php');

    $servername = "localhost";
    $username = "admin";
    $password = "admin";
    $dbname = "notes";

    try {
        $db = new PDO(
            "mysql".
            ':host='.$servername.
            ';dbname='.$dbname,
            $username, 
            $password);

        // set the PDO error mode to exception
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $noteidToRemove = $db->quote($_GET['noteid']);

        $sql = ("DELETE FROM `notes`.`notes` WHERE" . $noteidToRemove . "= noteid;");

        $db->exec($sql);
    }
    catch(PDOException $e)
    {
        echo $sql . "<br>" . $e->getMessage();
    }
    
    $db = null;

    
    exit();
?>