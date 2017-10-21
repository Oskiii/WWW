<!DOCTYPE HTML>
<html>
<head>
    <title>Noteapp</title>

    <link rel="stylesheet" type="text/css" href="theme.css">
    <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/humanity/jquery-ui.min.css">
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>
    <script src="app.js" type="text/javascript"></script>
</head>

<body>
    <div id="app-div">
        <h1>Oski's note-taking app</h1>
        <div id="note-input-div">
            <!-- <form id="task-input-form" action="notes_action.php" method="post"> -->
            <form id="task-input-form">
                <input type="text" name="note" id="new-task-input" placeholder="Type new task here...">
                <input type="submit" id="new-task-submit" value="Add task">
            </form> 
        </div>

        <div id="note-list-div">
            <h2>TODO:</h2>

            <!-- Filled in app.js -->
            <ul id="task-list"></ul>
        </div>
    </div>

    
</body>

</html>