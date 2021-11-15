var formEl = document.querySelector("#task-form");
var tasksToDoEl =  document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {                    // function to dynamically create new element
    event.preventDefault();                                // stops browser from reloading the page
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    var listItemEl = document.createElement("li");  //   create list item
    listItemEl.className = "task-item";

    var taskInfoEl = document.createElement("div");   // create div to hold task info and add to list item
    taskInfoEl.className = "task-info";             // give it a class name


    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    listItemEl.appendChild(taskInfoEl);      // add HTML content to div

    tasksToDoEl.appendChild(listItemEl);   // add entire list item to list
};

formEl.addEventListener("submit", createTaskHandler);     // run createTaskHandler function when button is clicked,
                                                            // or 'enter' is pressed on keyboard                                        
