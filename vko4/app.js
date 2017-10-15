$(document).ready(() => {
    console.log("hi");

    let taskInputField = $("#new-task-input");
    let taskInputForm = $("#task-input-form");
    let submitButton = $("#new-task-submit");
    let taskList = $("#task-list");

    taskInputForm.on('submit', (event) => {
        let newTask = taskInputField.val();
        console.log(newTask);
        addTask(newTask);
        taskInputField.val("");

        event.preventDefault();
    })

    function addTask(newTask){
        let newNode = $("<li class=\"task\">" + newTask + "</li>");
        taskList.append(newNode);

        newNode.hover(() => {
            newNode.addClass("hover");
        }, () => {
            newNode.removeClass("hover");
        });

        newNode.on('click', () => {
            newNode.fadeOut(() => {
                newNode.remove();
            });
        })
    }
});