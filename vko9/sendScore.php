<?php
    $servername = "localhost:8889";
    $port = "8889";
    $username = "root";
    $password = "root";
    $dbname = "scores";

    try {
        $db = new PDO(
            "mysql".
            ':host='.$servername.
            ':port='.$port.
            ';dbname='.$dbname,
            $username, 
            $password);

        // set the PDO error mode to exception
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $username = $db->quote($_POST['username']);
        $score = $db->quote($_POST['score']);

        $sql = (
            "INSERT INTO `scores`.`scores`
            (`username`,
            `score`,
            `scoretime`)
            VALUES
            ("
            . $username .","
            . $score .","
            . "NOW());");

        $db->query($sql);
    }
    catch(PDOException $e)
    {
        echo $sql . "<br>" . $e->getMessage();
    }
    
    $db = null;

    
    exit();
?>