// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
const generateTaskId = () => {
    // If nextId is null (not set), initialize it to 1
    if(nextId === null) {
        nextId = 1;
    } else {
        // Otherwise, increment the existing nextId
        nextId++;
    }
    // Store the updated nextId back to localStorage
    localStorage.setItem("nextId", JSON.stringify(nextId));
    // Return the new unique task id
    return nextId;
}

// Todo: create a function to create a task card
const createTaskCard = (task) => {
    // Create the main card element and set its attributes and classes
    const taskCard = $("<div>")
        .addClass("card w-75 task-card draggable my-3")
        .attr("data-task-id", task.id);
    
    // Create the card header and set its text
    const cardHeader = $("<div>").addClass("card-header h4").text(task.title);
    
    // Create the card body and its components
    const cardBody = $("<div>").addClass("card-body");
    const cardDescription = $("<p>").addClass("card-text").text(task.description);
    const cardDueDate = $("<p>").addClass("card-text").text(task.dueDate);
    const cardDeleteButton = $("<button>").addClass("btn btn-danger delete").text("Delete").attr("data-task-id", task.id);
    
    // Attach the delete event handler to the delete button
    cardDeleteButton.on("click", handleDeleteTask);

    // Apply background color based on task status and due date
    if (task.status === 'done') {
        taskCard.addClass("bg-purple text-white");
    } else if (task.dueDate) {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, "DD/MM/YYYY");
        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass("bg-warning text-white");
        } else if (now.isAfter(taskDueDate, 'day')) {
            taskCard.addClass("bg-danger text-white");
            cardDeleteButton.addClass("border-light");
        } else {
            taskCard.addClass("bg-success text-white"); // Tasks that aren't due yet
        }
    }

    // Append card components together
    cardBody.append(cardDescription, cardDueDate, cardDeleteButton);
    taskCard.append(cardHeader, cardBody);

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
const renderTaskList = () => {
    // Initialize taskList if not already set
    if (!taskList) {
        taskList = [];
    }

    // Get references to the task lists and empty them
    const todoList = $("#todo-cards");
    todoList.empty();
    const inProgressList = $("#in-progress-cards");
    inProgressList.empty();
    const doneList = $("#done-cards");
    doneList.empty();

    // Iterate over taskList and append tasks to the correct list
    for (let index = 0; index < taskList.length; index++) {
        if (taskList[index].status === "to-do") {
            todoList.append(createTaskCard(taskList[index]));
        } else if (taskList[index].status === "in-progress") {
            inProgressList.append(createTaskCard(taskList[index]));
        } else if (taskList[index].status === "done") {
            doneList.append(createTaskCard(taskList[index]));
        }
    }

    // Make task cards draggable
    $(".draggable").draggable({
        opacity: 0.7,
        zindex: 1000,
        helper: function (event) {
            let original;
            if ($(event.target).hasClass("ui-draggable")) {
                original = $(event.target);
            } else {
                original = $(event.target).closest(".ui-draggable");
            }
            return original.clone().css({
                maxWidth: original.outerWidth(),
                zindex: 1000
            });
        },
        start: function (event, ui) {
            ui.helper.css('z-index', 1000);
        }
    });
}

// Todo: create a function to handle adding a new task
const handleAddTask = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Create a new task object
    const task = {
        id: generateTaskId(),
        title: $("#taskTitle").val(),
        description: $("#taskDescription").val(),
        dueDate: $("#taskDueDate").val(),
        status: 'to-do'
    }

    // Add the new task to the task list and save to localStorage
    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    
    // Re-render the task list to include the new task
    renderTaskList();

    // Clear the form inputs
    $("#taskTitle").val("");
    $("#taskDescription").val("");
    $("#taskDueDate").val("");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) { 
    // Prevent the default button click behavior
    event.preventDefault();
    
    // Get the task ID from the button's data attribute
    const taskId = $(this).attr("data-task-id");
    
    // Filter out the task with the specified ID
    taskList = taskList.filter(task => task.id !== parseInt(taskId));
    
    // Save the updated task list to localStorage and re-render the task list
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
const handleDrop = (event, ui) => {
    // Get the task ID and new status from the event
    const taskId = ui.draggable[0].dataset.taskId;
    const newStatus = event.target.id;

    // Update the task's status in the task list
    for (let index = 0; index < taskList.length; index++) {
        if (taskList[index].id == parseInt(taskId)) {
            taskList[index].status = newStatus;
        }
    }
    
    // Save the updated task list to localStorage and re-render the task list
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(() => {
    // Initial render of the task list
    renderTaskList();

    // Attach the form submission event handler
    $("#taskForm").on("submit", handleAddTask);

    // Make lanes droppable and attach the drop event handler
    $(".lane").droppable({
        accept: ".draggable",
        drop: handleDrop
    });

    // Enable date picker on the due date field
    $("#taskDueDate").datepicker({
        changeMonth: true,
        changeYear: true,
    });
});