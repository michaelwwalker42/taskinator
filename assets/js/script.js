var formEl = document.querySelector("#save-task");
var tasksToDoEl =  document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {                    // function to dynamically create new element

    event.preventDefault();                                // stops browser from reloading the page

    var listItemEl = document.createElement("li");    // create the element in the document
    listItemEl.className = "task-item";               // give element a class so CSS is applied
    listItemEl.textContent = "This is a new task.";    // create text for new element
    tasksToDoEl.appendChild(listItemEl);              // add new element to parent element
};

formEl.addEventListener("submit", createTaskHandler);     // run createTaskHandler function when button is clicked

