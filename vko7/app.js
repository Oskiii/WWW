"use strict";

$(document).ready(() => {
    console.log("hi");

    const taskInputField = $("#new-task-input");
    const taskInputForm = $("#task-input-form");
    const taskList = $("#task-list");

    $("#task-list").load("notelist.php");

    taskInputForm.on('submit', (event) => {
        let newTask = taskInputField.val();
        console.log(newTask);

        $.post('note_add_action.php', 
            {
                note: newTask
            }
        ); 

        taskList.load("notelist.php");

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

function removeListItem(id){
    $.post('note_remove_action.php', 
        {
            noteid: id
        }
    ); 

    $("#task-list").load("notelist.php");
}