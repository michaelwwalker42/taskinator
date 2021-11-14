var buttonEl = document.querySelector("#save-task");
var tasksToDoEl =  document.querySelector("#tasks-to-do");

var createTaskHandler = function() {                    // function to dynamically create new element
    var listItemEl = document.createElement("li");    // create the element in the document
    listItemEl.className = "task-item";               // give element a class so CSS is applied
    listItemEl.textContent = "This is a new task.";    // create text for new element
    tasksToDoEl.appendChild(listItemEl);              // add new element to parent element
};

buttonEl.addEventListener("click", createTaskHandler);     // run createTaskHandler function when button is clicked

