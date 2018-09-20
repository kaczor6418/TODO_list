var isAdd = 0; // If we add element to the taskTable isAdd will rise up
var minued = 1;
// Adds a new activity to the TODOlist
function addActivity(activity, priority, isDone) {
  var activityTable = document.querySelector("tbody"),
      row = activityTable.insertRow(0);
  let cell1 = row.insertCell(0), // Activity
      cell2 = row.insertCell(1), // Priority
      cell3 = row.insertCell(2); // State of activity
      cell4 = row.insertCell(3); // Delete mark

// Add click event for change the state of activity(whether the task is done or not)
      cell3.addEventListener("click", function (e) {
          if(cell3.querySelector("path").classList.contains("Done")){

            // Save the state of activity in data
            let index = data.taskName.indexOf(activity);
            data.state[index] = notDone;

            // Change the state of activity
            cell3.querySelector("path").classList.toggle("Done");

          } else {
            // Save state of activity in data
            let index = data.taskName.indexOf(activity);
            data.state[index] = done;

            // Change the state of activity
            cell3.querySelector("path").classList.toggle("Done");

          }

          // Updating localStorage
          dataObjectUpdate();
      },false);

// Add click event for removing activity(whether the task is done or not)
      cell4.addEventListener("click", function (e) {
        let toRemove = this.parentNode;

        // Delete activity from data.completed
        let index = data.taskName.indexOf(activity);
        data.taskName.splice(index, 1);
        data.taskPriority.splice(index, 1);
        data.state.splice(index, 1);

        // Updating localStorage
        dataObjectUpdate();

        // All activities currently on the website
        currentActivities = (document.querySelectorAll("#taskTable tbody tr").length) - 1;

        // If we remove an element from the table, we want to add a new one which is not now on the site
        if(currentActivities <= rowsNumberVal){

            // if we added some item to the page and we are on the first page
            if (data.taskName.length >= currentActivities && isAdd !== 0 && currentPage === 1) {
              let newTask = data.taskName.length - currentPage*currentActivities;
              console.log("not added");
              addActivity(data.taskName[newTask],data.taskPriority[newTask],data.state[newTask]);
            }else {
              let newTask = currentPage*currentActivities;
              if(data.taskName.length < rowsNumberVal){
                activityTable.removeChild(toRemove);
                return;
              }
              if(newTask === data.taskName.length) newTask = 0;
              if (currentPage !== 1 && allPages-currentPage <= 0) {
                activityTable.removeChild(toRemove);
                newTask = newTask - (currentActivities+minued);
                addActivity(data.taskName[newTask],data.taskPriority[newTask],data.state[newTask]);
                minued++;
                return;
              }
              if (currentPage !== 1 && (allPages-currentPage >= 1)) {
                newTask = currentPage*currentActivities - 1;
                addActivity(data.taskName[newTask],data.taskPriority[newTask],data.state[newTask]);
                activityTable.removeChild(toRemove);
                return;
              }
              addActivity(data.taskName[newTask],data.taskPriority[newTask],data.state[newTask]);
          }
      }

        // Update x of y pageOf after remove item
        pageOf();

        // Delete activity from taskTable
        activityTable.removeChild(toRemove);
      },false);

      // Add new activity to the website
      cell1.innerHTML = activity;
      cell2.innerHTML = priority;
      cell3.innerHTML = isDone;
      cell4.innerHTML = deleTask;

      // Update x of y pageOf after add item
      pageOf();
}
