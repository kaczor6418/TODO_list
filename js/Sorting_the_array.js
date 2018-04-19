var trsArr; //All current taskTable activities
var thsArr; // Thead elements of task table
var table;

// it creates a fragment of a document that will be used to substitute an un-sorted table with a sorted
var documentFragment = document.createDocumentFragment();

// Add all task to the sorting table
function initSortElements(taskTable){
    table = document.querySelector("#taskTable"),
    ths = table.querySelectorAll("thead th"),
    trs = table.querySelectorAll("tbody tr");

    // Conversion of a pseudo array into an array
    thsArr = makeArray(ths);
    trsArr = makeArray(taskTable);

    // Add onclick event to the thead taskTable
    ths[0].onclick = sortByTask;
    ths[1].onclick = sortByTask;
    ths[2].onclick = sortByTask;
}

    // Removes sorting mark from element of table
    function clearClassName(nodeList) {
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].className = "";
      }
    }

    // If user adds a new activity into table this function will add activity to the sorting Table
    function addTaskToSortingArray(task) {
        trsArr.push(task);
    }

    // Conversion of a pseudo array into an array
    function makeArray(nodeList) {
      var arr = [];
      for (let i = 0; i < nodeList.length; i++) {
        arr.push(nodeList[i]);
      }
      return arr;
    }

    // Replace the unsorted table by sorted
    function toggleTaskTable() {
      trsArr.forEach(function(trTask) {
        documentFragment.appendChild(trTask);
      }, false);
      table.querySelector("tbody").appendChild(documentFragment);
    }

    // Sorting function
    function sortByTask(e) {
      let target = e.target,
          index = thsArr.indexOf(target), // This will check which column we clicked

          // It says what type of sorting has been made
          orderBy = (target.className === "" || target.className === "desc") ? "asc" : "desc";

          // Clears the field in which the type of sort was entered
          clearClassName(ths);

      trsArr.sort(function (a, b) {

        let tdA = a.children[index].textContent,
            tdB = b.children[index].textContent;

        // Assumptions needed to sort the priority
        if(tdA === "High") tdA = 2;
        if(tdA === "Medium") tdA = 1;
        if(tdA === "Low") tdA = 0;
        if(tdB === "High") tdB = 2;
        if(tdB === "Medium") tdB = 1;
        if(tdB === "Low") tdB = 0;

        // Assumptions needed to sort the state
        if(index === 3){
          if(trsArr[index].querySelector("path").classList.contains("Done")){
            tdA = 0;
            tdB = 0;
          }else {
            tdA = 1;
            tdB = 1;
          }
        }

        // Sort function
        if(tdA < tdB){
          return orderBy === "asc" ? -1 : 1;
        }if (tdA > tdB) {
          return orderBy === "asc" ? 1 : -1;
        }else {
          return 0;
        }
      }, false);

      // Sets type of sorting
      target.className = orderBy;

      // Replace the unsorted table by sorted
      toggleTaskTable();
    }
