# Task Board Application

A simple task board application that allows a team to manage project tasks. This app runs in the browser and features dynamically updated HTML and CSS powered by jQuery.

## User Story

AS a project team member with multiple tasks to organize  
I WANT a task board  
SO THAT I can add individual project tasks, manage their state of progress, and track overall project progress accordingly

## Acceptance Criteria

- GIVEN a task board to manage a project
- WHEN I open the task board
  - THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
- WHEN I view the task board for the project
  - THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
- WHEN I click on the button to define a new task
  - THEN I can enter the title, description, and deadline date for the new task into a modal dialog
- WHEN I click the save button for that task
  - THEN the properties for that task are saved in localStorage
- WHEN I drag a task to a different progress column
  - THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
- WHEN I click the delete button for a task
  - THEN the task is removed from the task board and will not be added back after refreshing
- WHEN I refresh the page
  - THEN the saved tasks persist

## Technologies Used

- **Frontend:** HTML, CSS, jQuery
- **Backend:** JavaScript
- **Library:** Day.js

## Screenshots

- Home Page: Displays the input area for creating new tasks and the task board columns for different progress states.

  ![Home Page](/assets/images/HomePage.png)

- Task Modal: Modal dialog for entering new task details including title, description, and deadline date.

  ![Task Modal](/assets/images/TaskSetupPage.png)

## Features

- Dynamic task list organized by progress state (Not Yet Started, In Progress, Completed)
- Color-coded tasks based on deadlines (yellow for nearing deadline, red for overdue)
- Modal dialog for creating new tasks
- Tasks are stored in localStorage to persist across page refreshes
- Drag and drop functionality to update task progress state
- Delete functionality to remove tasks from the board

## Deployed Link

https://pauleerama93.github.io/05-module-05-task-tracker/

## Credits

I would like to extend my deepest gratitude to my teachers, Drew and Kyle, for their invaluable guidance and support throughout the development of this module. Their expertise and encouragement were instrumental in helping me navigate the challenges and successfully complete this project.

A special thanks to Drew for his speed runs, which were exceptionally helpful in understanding the concepts and techniques required to optimize performance and efficiency.

Thank you both for your dedication to teaching and for inspiring me to achieve my best.



