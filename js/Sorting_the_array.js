var trsArr, //All current taskTable activities
    thsArr, // Thead elements of task table
    ths,
    table;

// Add all task to the sorting table
function initSortElements(taskTable){
    table = document.querySelector("#taskTable");
    ths = table.querySelectorAll("thead th");

    // Add onclick event to the thead taskTable
    ths[0].onclick = sortBy;
    ths[1].onclick = sortBy;
    ths[2].onclick = sortBy;
}

    // Removes sorting mark from element of table
    function clearClassName(nodeList) {
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].className = "";
      }
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

      // it creates a fragment of a document that will be used to substitute an un-sorted table with a sorted
      let documentFragment = document.createDocumentFragment(),
          parentNode = table.querySelector("tbody");

      trsArr.forEach(function(trTask) {
        documentFragment.appendChild(trTask);
      }, false);
    parentNode.insertBefore(documentFragment, parentNode.childNodes[0]);
    }

    // Sorting function
    function sortBy(e) {
      thsArr = makeArray(ths);
      let target = e.target,
          index = thsArr.indexOf(target), // This will check which column we clicked
          trs = table.querySelectorAll("tbody tr");

          // Conversion of a pseudo array into an array
          trsArr = makeArray(trs);
          trsArr.pop();

          // It says what type of sorting has been made
          orderBy = (target.className === "" || target.className === "desc") ? "asc" : "desc";

          // Clears the field in which the type of sort was entered
          clearClassName(ths);

      trsArr.sort(function (a, b) {

        let tdA = a.children[index].textContent,
            tdB = b.children[index].textContent;

        // Assumptions needed to sort the priority
        if (index === 1) {
          if(tdA === "High") tdA = 2;
          if(tdA === "Medium") tdA = 1;
          if(tdA === "Low") tdA = 0;
          if(tdB === "High") tdB = 2;
          if(tdB === "Medium") tdB = 1;
          if(tdB === "Low") tdB = 0;
        }

        if (index === 2) {
          if(a.children[index].querySelector("svg path").classList.contains("Done")){
            tdA = 1;
          } else {
            tdA = 0;
          }
          if(b.children[index].querySelector("svg path").classList.contains("Done")) {
            tdB = 1;
          } else {
            tdB = 0;
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
