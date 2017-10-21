<?php
    $servername = "localhost";
    $username = "admin";
    $password = "admin";
    $dbname = "notes";

    $listItems = "";

    try {
        $db = new PDO(
            "mysql".
            ':host='.$servername.
            ';dbname='.$dbname,
            $username, 
            $password);

        // set the PDO error mode to exception
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $q = $db->prepare("SELECT noteid, note, notetime FROM notes");
        $q->execute();

        $qresult = $q->fetchAll();

        foreach($qresult as $row){
            $newNode = getListNode($row['noteid'], $row['note']);
            $listItems = $listItems . $newNode;
        }
    }
    catch(PDOException $e)
    {
        echo $sql . "<br>" . $e->getMessage();
    }
    
    echo $listItems;

    $db = null;
    exit();

    // Create new <li> object for task list
    function getListNode($id, $text){
        $onmouseover = "highlight(this)";
        $onmouseout = "unHighlight(this)";
        $onclick = "location.href='note_remove_action.php?noteid=" . $id . "'";
        $button = "<input id=\"delete-button\" type=\"button\" onclick=\"" . $onclick . "\" value=\" X \" />";
        
        return "<li class=\"task\" onmouseover=\"" . $onmouseover . "\" onmouseout=\"" . $onmouseout . "\" >" . $text . $button . "</li>";
    }
?>