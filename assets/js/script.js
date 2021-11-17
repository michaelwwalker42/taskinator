var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl =  document.querySelector("#tasks-to-do");
var tasksInProgreeEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");

// create array to hold tasks for saving
var tasks = [];


//-------------------------------------taskFormHandler Function------------------------------------------------

var taskFormHandler = function(event) {                    // function to dynamically create new element

    event.preventDefault();                                // stops browser from reloading the page upon a form submission

    //to read a form input's data, select that input element directly and read its value property
    var taskNameInput = document.querySelector("input[name='task-name']").value;  
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {                   // check if input values are empty strings
        alert("You need to fill out the task form!");
        return false;
    }
  // reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

  // check if task is new or one being edited by seeing if it has a data-task-id attribute
    var isEdit = formEl.hasAttribute("data-task-id");
    
    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {    
        var taskDataObj = {               // package up data as an object
         name: taskNameInput,
         type: taskTypeInput,
         status: "to do"
    };
    createTaskEl(taskDataObj);      // send it as an argument to createTaskEl
    }
};

//------------------------------------createTaskEl Function-----------------------------------------------------

var createTaskEl = function(taskDataObj) {

    var listItemEl = document.createElement("li");  //   create list item
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    var taskInfoEl = document.createElement("div");   // create div to hold task info and add to list item
    taskInfoEl.className = "task-info";             // give it a class name
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);      // add HTML content to div

    // create task actions (buttons and select) for task
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);             
    tasksToDoEl.appendChild(listItemEl);   // add entire list item to list

    // save task as an object with name, type, status, and id properties then push it into tasks array
    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);

    // increase task counter for next unique id
    taskIdCounter++;

};
//-------------------------------------------------------------------------------------------------------------

//-----------------------------------------createTaskActions function-------------------------------------------

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");       // create div
    actionContainerEl.className = "task-actions";                // give div a class
        // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";                  // add text to button
    editButtonEl.className = "btn edit-btn";            // give button a class
    editButtonEl.setAttribute("data-task-id", taskId);     // give button a custom data attribute
    actionContainerEl.appendChild(editButtonEl);          // attach button to actionContainerEl

        // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";                      // add text to button
    deleteButtonEl.className = "btn delete-btn";             // give button a class
    deleteButtonEl.setAttribute("data-task-id", taskId);       // give button a custom data attribute
    actionContainerEl.appendChild(deleteButtonEl);           // attach button to actionContainerEl

       // create change status dropdown
    var statusSelectEl = document.createElement("select");     // create select element
    statusSelectEl.className = "select-status";               // give element a class
    statusSelectEl.setAttribute("name", "status-change");      
    statusSelectEl.setAttribute("data-task-id", taskId);        // give element a data attribute
    actionContainerEl.appendChild(statusSelectEl);                // attach element to container

        // create statusChoices array
    var statusChoices = ["To Do", "In Progress", "Completed"];

       // for loop
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
      var statusOptionEl = document.createElement("option"); 
      statusOptionEl.textContent = statusChoices[i];         // statusChoices[i] returns value of the array at the given index
      statusOptionEl.setAttribute("value", statusChoices[i]);        

        // append to select
      statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};
//---------------------------------------------completeEditTask function---------------------------------------

var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {                      // parseInt() function converts string to number
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    alert("Task Updated!");

    // remove data attribute from form
    formEl.removeAttribute("data-task-id");

    document.querySelector("#save-task").textContent = "Add Task";
};
//-------------------------------------------------------------------------------------------------------------
//--------------------------------------------------taskButtonHandler function----------------------------------

var taskButtonHandler = function(event) {
   var targetEl = event.target;                 // event.target reports the element on which the event occurs

    // edit button clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    // delete button clicked
    else if (targetEl.matches(".delete-btn")) {
        // get the element's task id
        var taskId = targetEl.getAttribute("data-task-id"); //getAttribute() returns the value of a specified attribute on the element
        deleteTask(taskId);
    }
};
//-------------------------------------------------------------------------------------------------------------

//-----------------------------------------taskStatusChangeHandler function-------------------------------------
var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue ==="to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgreeEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    // update task's in tasks array
    for (var i =0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
};
//--------------------------------------------------------------------------------------------------------------


//----------------------------------------------------editTask function---------------------------------------

var editTask = function(taskId) {
    console.log(taskId);
                                                                          // document.querySelector() searches within document element
                                                             // taskSelected.querySelector() only searches within taskSelected element
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']"); 
                                                                         
    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";  // change button text after edit button clicked
    formEl.setAttribute("data-task-id", taskId);
};
//------------------------------------------------------------------------------------------------------------

//-------------------------------------------------deleteTask function-----------------------------------------

var deleteTask = function(taskId) {
    console.log(taskId);
    // find task list element with taskId value and remove it
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();                 // remove method 

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i =0; i , tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
     if (tasks[i].id !== parseInt(taskId)) {
         updatedTaskArr.push(tasks[i]);
     }   
    }

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
  };
//-------------------------------------------------------------------------------------------------------------

// create a new task
formEl.addEventListener("submit", taskFormHandler);    // submit works on mouse click or enter on keyboard      

// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

// for changing status
pageContentEl.addEventListener("change", taskStatusChangeHandler);
