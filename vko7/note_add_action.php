<?php
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

        $newNote = $db->quote($_POST['note']);
        $sql = (
            "INSERT INTO `notes`.`notes`
            (`note`,
            `notetime`)
            VALUES
            (". $newNote .",
            NOW());");

        $db->query($sql);
    }
    catch(PDOException $e)
    {
        echo $sql . "<br>" . $e->getMessage();
    }
    
    $db = null;

    
    exit();
?>