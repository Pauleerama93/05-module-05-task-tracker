// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
const generateTaskId = () => {
    
}

// Todo: create a function to create a task card
const createTaskCard = (task) => {

}

// Todo: create a function to render the task list and make cards draggable
const renderTaskList = () => {
    //Making an if statement for a task list if there isn't one already saved
    if(!taskList) {
        //An array for task list
        taskList = [];
    }
    // Creating varables that link to the id's and making them empty 
    const todoList = $("#todo-cards");
    todoList.empty();

    const inProgressList = $("#in-progress-cards");
    inProgressList.empty();

    const doneList = $("#done-cards");
    doneList.empty();
    //a for loop that runs thru the task list and appends anything = to "to-do"
    for(let index = 0; index < taskList.length; index++) {
        if(taskList[index].status === "to-do") {
            todoList.append(createTaskCard(taskList[index]));
        }
    }
    // Creating a way to drag cards
    $(".draggable").draggable({
        opacity: 0.7,
        zindex: 100,

        helper: function(event) {
            let original;
            if($(event.target).hasClass("ui-draggable")) {
                original = $(event.target);
            } else {
                original = $(event.target).closest(".ui-draggable");
            }

            return original.clone().css({
                maxWidth: original.outterWidth(),
            });
        }
    });
}

// Todo: create a function to handle adding a new task
const handleAddTask = (event) => {

}

// Todo: create a function to handle deleting a task
const handleDeleteTask = (event) => { 

}

// Todo: create a function to handle dropping a task into a new status lane
const handleDrop = (event, ui) => {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(() => {
    renderTaskList();

    $("taskForm").on("submit", handleAddTask)

    
});
