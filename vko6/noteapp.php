<!DOCTYPE HTML>
<html>
<head>
    <title>Noteapp</title>

    <link rel="stylesheet" type="text/css" href="theme.css">
    <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/humanity/jquery-ui.min.css">

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>
    <script>
        "use strict";
        function highlight(element){
            $(element).addClass("hover");
        }

        function unHighlight(element){
            $(element).removeClass("hover");
        }
    </script>
</head>

<body>
    <div id="app-div">
        <h1>Oski's note-taking app</h1>
        <div id="note-input-div">
            <form id="task-input-form" action="notes_action.php" method="post">
                <input type="text" name="note" id="new-task-input" placeholder="Type new task here...">
                <input type="submit" id="new-task-submit" value="Add task">
            </form> 
        </div>

        <div id="note-list-div">
            <h2>TODO:</h2>

            <?php
                $servername = "localhost";
                $username = "admin";
                $password = "admin";
                $dbname = "notes";

                $list = "<ul id=\"task-list\">";
            
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
                        $onclick = "location.href='note_remove_action.php?noteid=" . $row['noteid'] . "'";
                        $onmouseover = "highlight(this)";
                        $onmouseout = "unHighlight(this)";
                        
                        $button = " <input id=\"delete-button\" type=\"button\" onclick=\"" . $onclick . "\" value=\" X \" />";
                        
                        $list = $list . "<li class=\"task\" onmouseover=\"" . $onmouseover . "\" onmouseout=\"" . $onmouseout . "\" >" . $row['note'] . $button . "</li>";
                    }
                }
                catch(PDOException $e)
                {
                    echo $sql . "<br>" . $e->getMessage();
                }
                
                $db = null;
            
                $list = $list . "</ul>";
                echo $list;
                
                exit();
            ?>

            </ul>
        </div>
    </div>

    
</body>

</html>