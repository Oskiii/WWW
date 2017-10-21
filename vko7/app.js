"use strict";

$(document).ready(() => {
    console.log("hi");

    const taskListDiv = $("#note-list-div");
    const taskInputField = $("#new-task-input");
    const taskInputForm = $("#task-input-form");
    const submitButton = $("#new-task-submit");
    const taskList = $("#task-list");

    $("#task-list").load("notelist.php");

    taskInputForm.on('submit', (event) => {
        let newTask = taskInputField.val();
        console.log(newTask);

        $.post('notes_action.php', 
            {
                note: newTask
            }
        ); 

        $("#task-list").load("notelist.php");

        taskInputField.val("");
        event.preventDefault();
    })
});

function highlight(element){
    $(element).addClass("hover");
}

function unHighlight(element){
    $(element).removeClass("hover");
}