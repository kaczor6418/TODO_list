var rowsNumberVal = 5,
    currentPage = 1,
    allPages,
    currentActivities,
    prevIndex,
    nextIndex;

function renderSelectedRowsNumber(data,startIndex) {
  pageOf(data, rowsNumberVal, currentPage);
  let old = document.querySelector("#taskTable tbody");
      counter = 0,

      //  All activities we have added
      allActivities = data.taskName.length;

      // All activities currently on the website
      currentActivities = (document.querySelectorAll("#taskTable tbody tr").length) - 1;
      for (var i = 0; i < currentActivities; i++) {
          old.deleteRow(0);
      }
    // Renders the activities
    for (let i = startIndex; i < allActivities ; i++) {
    var   renderActivity = data.taskName[i];
          renderPriority = data.taskPriority[i];
          renderState = data.state[i];

          if (counter >= rowsNumberVal) {
            return;
          }
    counter++;
    addActivity(renderActivity, renderPriority, renderState);
    }
}

function pageOf(data, rows, index) {
  allPages = Math.ceil(data.taskName.length / rows);

let substitution = document.querySelector("#page-of");

      if(allPages < 1) allPages = 1;

      let textnode = document.createTextNode( currentPage + " of " + allPages);

      substitution.replaceChild(textnode, substitution.childNodes[0]);
}

function initNextPrev(data){

  var button = document.querySelectorAll("#next-prev svg"),
      rowsNumber = document.querySelector("#rows-per-page");

      // all activities currently on the website
      currentActivities = (document.querySelectorAll("#taskTable tbody tr").length) - 1;

      // Add click event to change the number of rows
      rowsNumber.addEventListener("click", function (e) {
        rowsNumberVal = document.querySelector("#rows-per-page").value;
        pageOf(data,rowsNumberVal, currentPage);
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
        prevIndex = (rowsNumberVal * currentPage) - (2 * currentActivities);
        currentPage--;
        renderSelectedRowsNumber(data,prevIndex);

      }, false);
}
