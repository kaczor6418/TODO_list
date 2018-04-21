var rowsNumberVal = 5,
    startIndex = 0,
    allPages,
    currentPage;

function renderSelectedRowsNumber(data,rows) {
  let next = document.querySelectorAll("#next-prev svg:first-child"),
      prev = document.querySelectorAll("#next-prev svg:last-child");


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

  var rowsNumber = document.querySelector("#rows-per-page");
  // Add click event
        rowsNumber.addEventListener("click", function (e) {
          rowsNumberVal = document.querySelector("#rows-per-page").value;
          pageOf(data,rowsNumberVal, startIndex);
        },false);
}
