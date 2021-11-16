var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl =  document.querySelector("#tasks-to-do");

var pageContentEl = document.querySelector("#page-content");


//-------------------------------------taskFormHandler Function------------------------------------------------

var taskFormHandler = function(event) {                    // function to dynamically create new element

    event.preventDefault();                                // stops browser from reloading the page upon a form submission

    //to read a form input's data, select that input element directly and read its value property
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

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    var taskInfoEl = document.createElement("div");   // create div to hold task info and add to list item
    taskInfoEl.className = "task-info";             // give it a class name
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);      // add HTML content to div

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);             
    tasksToDoEl.appendChild(listItemEl);   // add entire list item to list

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
      statusOptionEl = document.createElement("option");      
      statusOptionEl.textContent = statusChoices[i];         // statusChoices[i] returns value of the array at the given index
      statusOptionEl.setAttribute("value", statusChoices[i]);        

        // append to select
      statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
}
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
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();                 // remove method 
  };
//-------------------------------------------------------------------------------------------------------------

// create a new task
formEl.addEventListener("submit", taskFormHandler);    // submit works on mouse click or enter on keyboard
      

// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);
