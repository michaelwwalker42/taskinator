var formEl = document.querySelector("#task-form");
var tasksToDoEl =  document.querySelector("#tasks-to-do");

//-------------------------------------taskFormHandler Function------------------------------------------------

var taskFormHandler = function(event) {                    // function to dynamically create new element
    event.preventDefault();                                // stops browser from reloading the page
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if(!taskNameInput || !taskTypeInput) {                   // check if input values are empty strings
        alert("You need to fill out the task form!");
        return false;
    }
    formEl.reset();                  // reset method works specifically on form elements only
    
    var taskDataObj = {               // package up data as an object
        name: taskNameInput,
        type: taskTypeInput
    };
    createTaskEl(taskDataObj);      // send it as an argument to createTaskEl
}
//------------------------------------createTaskEl Function-----------------------------------------------------

var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li");  //   create list item
    listItemEl.className = "task-item";

    var taskInfoEl = document.createElement("div");   // create div to hold task info and add to list item
    taskInfoEl.className = "task-info";             // give it a class name

    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);      // add HTML content to div

    tasksToDoEl.appendChild(listItemEl);   // add entire list item to list
};
//-------------------------------------------------------------------------------------------------------------

formEl.addEventListener("submit", taskFormHandler);     // run taskFormHandler function when button is clicked,
                                                            // or 'enter' is pressed on keyboard                                        
