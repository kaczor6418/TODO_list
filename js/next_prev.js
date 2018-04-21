var rowsNumberVal = 5,
    startIndex = 0,
    allPages,
    currentPage;

function renderSelectedRowsNumber(data,rows) {
  startIndex--;
  pageOf(data, rowsNumberVal, startIndex);
  let old = document.querySelector("#taskTable tbody tr").parentNode;
      old.remove();
      
  activityTable.removeChild(toRemove);
}

function pageOf(data, rows, index) {
  allPages = Math.ceil(data.taskName.length / rows),
  currentPage =  Math.ceil(index/rows);

let substitution = document.querySelector("#page-of");

      if(allPages < 1) allPages = 1;
      if(currentPage < 1) currentPage = 1;

      let textnode = document.createTextNode( currentPage + " of " + allPages);

      substitution.replaceChild(textnode, substitution.childNodes[0]);
}

function initNextPrev(data){

  var button = document.querySelectorAll("#next-prev svg"),
      rowsNumber = document.querySelector("#rows-per-page");

      // Add click event to change the number of rows
      rowsNumber.addEventListener("click", function (e) {
        rowsNumberVal = document.querySelector("#rows-per-page").value;
        pageOf(data,rowsNumberVal, startIndex);
      },false);

      // Add click event to change page(prev)
      button[0].addEventListener("click", function () {
        if(startIndex < 2) return;

        let currentActivities = (document.querySelectorAll("#taskTable tbody tr").length) - 1;
        var index = (rowsNumberVal * currentPage) - (2 * currentActivities)

      }, false);
}
