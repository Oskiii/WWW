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

        if(isset($_POST['username']) && isset($_POST['score'])){
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

        if(isset($_POST['fetchScores'])){
            $scoresToFetch = $_POST['fetchScores'];

            $sql = (
                "SELECT username, score FROM `scores`.`scores`
                ORDER BY score DESC
                LIMIT " . $scoresToFetch);
    
            $stmt = $db->prepare($sql);
            $stmt->execute();

            $result = $stmt->fetchAll();

            echo json_encode($result);
        }
    }
    catch(PDOException $e)
    {
        echo $sql . "<br>" . $e->getMessage();
    }
    
    $db = null;

    
    exit();
?>