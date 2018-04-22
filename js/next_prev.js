var rowsNumberVal = 5,    // Number of rows that we chose(default 5)
    currentPage = 1,      // Page we are currently on
    allPages,             // All pages we have
    allActivities,        // All activities we have
    currentActivities,    // All activities that already on website
    prevIndex,            // First index of prev table activity
    nextIndex;            // First index of next table activity

// Render new activities
function renderNewAcrivities(startIndex, end) {
  let counter = 0; // Make sure that we do not go beyond the scope of the site
  allActivities = data.taskName.length;

  for (let i = startIndex; i < end; i++) {
    var   renderActivity = data.taskName[i];
          renderPriority = data.taskPriority[i];
          renderState = data.state[i];

          //If you have rendered as many activities as maximal on the page or more than you have
          if ((counter >= rowsNumberVal) || rowsNumberVal >= allActivities) {
            if (rowsNumberVal >= allActivities) {
                for (let j = 0; j < data.taskName.length; j++) {
                  var   renderActivity1 = data.taskName[j];
                        renderPriority1 = data.taskPriority[j];
                        renderState1 = data.state[j];

                        // Adds activity to the website
                        addActivity(renderActivity1, renderPriority1, renderState1);
            }
          }
          return;
        }
          currentActivities ++;
          counter++;

      // Adds activity to the website
      addActivity(renderActivity, renderPriority, renderState);
  }
}

function deleteActivities(toDelete) {
  // Actvities on the page
  let old = document.querySelector("#taskTable tbody");
  console.log(toDelete);
    console.log(old);

  // Delete all activities that we had on previous page
  for (let i = 0; i < toDelete; i++) {
    console.log(i);
      old.deleteRow(0);
  }
}

// Render todo LIST of all activities that we have on prev or next page
function renderSelectedRowsNumber(data,startIndex) {

  // All activities that already on website
  currentActivities = 0;

  // Change current page number on website
  pageOf(data, rowsNumberVal, currentPage);

  //  All activities we have added
  allActivities = data.taskName.length;

  // All activities we had on previous page
  previousActivities = (document.querySelectorAll("#taskTable tbody tr").length) - 1;

  // Delete all activities that we had on previous page
  deleteActivities(previousActivities);

  // Renders the activities
  renderNewAcrivities(startIndex, allActivities);
}

// Change current page number on website
function pageOf(data, rows, index) {
  allPages = Math.ceil(data.taskName.length / rows);

let substitution = document.querySelector("#page-of");

      if(allPages < 1) allPages = 1;
      if(allPages < currentPage) currentPage = 1;
      let textnode = document.createTextNode( currentPage + " of " + allPages);
      substitution.replaceChild(textnode, substitution.childNodes[0]);
}

// Initializing next and prev buttons
function initNextPrev(data){

  var button = document.querySelectorAll("#next-prev svg"), // Next and prev buttons
      rowsNumber = document.querySelector("#rows-per-page");

      // all activities currently on the website
      currentActivities = (document.querySelectorAll("#taskTable tbody tr").length) - 1;

      // Add click event to change the number of rows
      rowsNumber.addEventListener("click", function (e) {
          let oldRowsNumberVal = rowsNumberVal;
          rowsNumberVal = parseInt(document.querySelector("#rows-per-page").value, 10);
          pageOf(data,rowsNumberVal, currentPage);

          currentActivities = (document.querySelectorAll("#taskTable tbody tr").length) - 1;

          //If you change the number of all rows and (oldRowsNumberVal < rowsNumberVal) || (oldRowsNumberVal > rowsNumberVal)
          if(oldRowsNumberVal < rowsNumberVal || oldRowsNumberVal > rowsNumberVal ) {
            console.log("elo");
            deleteActivities(currentActivities);
            renderNewAcrivities(0, rowsNumberVal);
          }
      },false);

      // Add click event to change page(next)
      button[1].addEventListener("click", function () {
        if(currentPage >= allPages) return;
        nextIndex = (rowsNumberVal * currentPage);
        currentPage++;
        renderSelectedRowsNumber(data,nextIndex);
      }, false);

      // Add click event to change page(prev)
      button[0].addEventListener("click", function () {
        if(currentPage < 2) return;

        // all activities currently on the website
        currentActivities = (document.querySelectorAll("#taskTable tbody tr").length) - 1;

        prevIndex = (rowsNumberVal * currentPage) - (2 * rowsNumberVal);
        currentPage--;
        renderSelectedRowsNumber(data,prevIndex);

      }, false);
}
