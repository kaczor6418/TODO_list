var data = (localStorage.getItem("todoList")) ?  JSON.parse(localStorage.getItem("todoList")):{
  completed: {
    taskName: [],
    taskPriority: []
  } ,
  todo:{
    taskName: [],
    taskPriority: []
  }
};

(function() {

var form = document.querySelector("#validation"),
    fields = form.querySelectorAll("[data-error]"),
    enterActivity = form.querySelector("input"),
    selectPriority = form.querySelector("select");

// SVG that will be used into TODOlist
var isDone = '<svg class="checkBox" width="30" height="30" xmlns="http://www.w3.org/2000/svg"> <g><title>background</title><rect fill="none" height="402" width="582" y="-1" x="-1"/> </g><g><title>Layer 1</title><rect rx="2" fill-opacity="0" height="23.022598" width="22.17514" y="3.453391" x="3.947742" stroke-width="1.5" stroke="#b6b6b6" fill="#0fffff"/><path fill="#e79c49" opacity="0" d="m24,4l-18,0c-1.105,0 -2,0.895 -2,2l0,18c0,1.105 0.895,2 2,2l18,0c1.105,0 2,-0.895 2,-2l0,-18c0,-1.105 -0.896,-2 -2,-2zm-2.293,7.707l-7.56,7.56c-0.188,0.188 -0.442,0.293 -0.707,0.293s-0.52,-0.105 -0.707,-0.293l-3.453,-3.453c-0.391,-0.391 -0.391,-1.023 0,-1.414s1.023,-0.391 1.414,0l2.746,2.746l6.853,-6.853c0.391,-0.391 1.023,-0.391 1.414,0s0.391,1.023 0,1.414z"/></g></svg>',
    deleTask = '<svg class="delete" width="12.7" height="12.7" xmlns="http://www.w3.org/2000/svg"> <g> <title>background</title> <rect fill="none" height="402" width="582" y="-1" x="-1"/> </g> <g> <title>Layer 1</title> <path clip-rule="nonzero" fill-rule="evenodd" stroke-width="1.411111" stroke-miterlimit="4" stroke-dashoffset="0" d="m3.88056,2.822212l-1.05834,1.05834l2.46945,2.46944l-2.46945,2.46944l1.05834,1.05834l2.46944,-2.46945l2.46944,2.46945l1.05834,-1.05834l-2.46945,-2.46944l2.46945,-2.46944l-1.05834,-1.05834l-2.46944,2.46945l-2.46944,-2.46945z"/> </g></svg>';

renderTodoList();

// Render todo LIST of all activities that user added to the taskTable
function renderTodoList() {

    // If all elements of the data object are empty, the function won't render anything
  if (!data.todo.taskName.length && !data.completed.taskName.length) return;

  for (var i = 0; i < data.completed.taskName.length; i++) {
    var completedActivity1,
        completedPriority1;

        completedActivity1 = data.completed.taskName[i];
        completedPriority1 = data.completed.taskPriority[i];

    addActivity(completedActivity1, completedPriority1);
    document.querySelector(".checkBox").querySelector("path").classList.add("Done");
  }
  for (var j = 0; j < data.todo.taskName.length; j++) {
    var completedActivity2,
        completedPriority2;

        completedActivity2 = data.todo.taskName[j];
        completedPriority2 = data.todo.taskPriority[j];

    addActivity(completedActivity2, completedPriority2);
  }
}

// Add activities to the localStorage
function dataObjectUpdate() {
  localStorage.setItem("todoList", JSON.stringify(data));
}

// Adds a new activity to the TODOlist
function addActivity(activity, priority) {
  var activityTable = document.querySelector("tbody"),
      row = activityTable.insertRow(0);

  let cell1 = row.insertCell(0),
      cell2 = row.insertCell(1),
      cell3 = row.insertCell(2);
      cell4 = row.insertCell(3);

// Reset enterActivity and selectPriority values
        if(enterActivity.value !== ""){
          enterActivity.value = "";
        }
        if(selectPriority.value !== ""){
          selectPriority.value = "";
        }

// Add click event for change the state of activity(whether the task is done or not)
      cell3.addEventListener("click", function (e) {
          if(cell3.querySelector("path").classList.contains("Done")){

            // Save the state of activity in data
            let index = data.completed.taskName.indexOf(activity);
            data.completed.taskName.splice(index, 1);
            data.completed.taskPriority.splice(index, 1);
            data.todo.taskName.push(activity);
            data.todo.taskPriority.push(priority);

            // Change the state of activity
            cell3.querySelector("path").classList.toggle("Done");

          } else {
            // Save state of activity in data
            let index = data.todo.taskName.indexOf(activity);
            data.todo.taskName.splice(index, 1);
            data.todo.taskPriority.splice(index, 1);
            data.completed.taskName.push(activity);
            data.completed.taskPriority.push(priority);

            // Change the state of activity
            cell3.querySelector("path").classList.toggle("Done");
          }
          dataObjectUpdate();
      },false);

// Add click event for removing activity(whether the task is done or not)
      cell4.addEventListener("click", function (e) {
        let toRemove = this.parentNode;

        if(cell3.querySelector("path").classList.contains("Done")){

          // Delete activity from data.todo
          let index = data.completed.taskName.indexOf(activity);
          data.completed.taskName.splice(index, 1);
          data.completed.taskPriority.splice(index, 1);

        } else {
          // Delete activity from data.completed
          let index = data.todo.taskName.indexOf(activity);
          data.todo.taskName.splice(index, 1);
          data.todo.taskPriority.splice(index, 1);
        }
        dataObjectUpdate();
        activityTable.removeChild(toRemove);
      },false);

// Add new activity to the website
      cell1.innerHTML = activity;
      cell2.innerHTML = priority;
      cell3.innerHTML = isDone;
      cell4.innerHTML = deleTask;
}

// Checks the form field is empty
function isEmpty(field) {
  return field.value !== "";
}

// Add click event for add activity
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let errors = [];

// Checks the form has been completed
  for (let i = 0; i < fields.length; i++) {
    let field = fields[i],
        isValid = null;

    switch (field.type) {
      case "text":
        isValid = isEmpty(field);
        break;
      case "select-one":
        isValid = isEmpty(field);
        break;
      default:
    }

    if (!isValid) {
      field.classList.add("error");
      errors.push(field.dataset.error);
    }else {
      field.classList.remove("error");
    }
  }
  if(errors.length) {
    enterActivity.style.background = "#ffc6c6";
    selectPriority.style.background = "#ffc6c6";
  }else {
    var taskName = enterActivity.value,
        taskPriority = selectPriority.value;
        // Save activity and priority in data
              data.todo.taskName.push(taskName);
              data.todo.taskPriority.push(taskPriority);
              dataObjectUpdate();
    addActivity(taskName,taskPriority);
  }

}, false)
})();
