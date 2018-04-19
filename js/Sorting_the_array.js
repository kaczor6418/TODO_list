var trsArr;
var thsArr;
var table;

var documentFragment = document.createDocumentFragment();
function initSortElements(taskTable){
    table = document.querySelector("#taskTable"),
    ths = table.querySelectorAll("thead th"),
    trs = table.querySelectorAll("tbody tr");

    thsArr = makeArray(ths);
    trsArr = makeArray(taskTable);

    ths[0].onclick = sortByTask;
    ths[1].onclick = sortByTask;
    ths[2].onclick = sortByTask;
}


    function clearClassName(nodeList) {
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].className = "";
      }
    }

    function addTaskToSortingArray(task) {
        trsArr.push(task);
    }

    function makeArray(nodeList) {
      var arr = [];
      for (let i = 0; i < nodeList.length; i++) {
        arr.push(nodeList[i]);
      }
      return arr;
    }

    function toggleTaskTable() {
      trsArr.forEach(function(trTask) {
        documentFragment.appendChild(trTask);
      }, false);

      table.querySelector("tbody").appendChild(documentFragment);
    }

    function sortByTask(e) {
      let target = e.target,
          index = thsArr.indexOf(target),

          orderBy = (target.className === "" || target.className === "desc") ? "asc" : "desc";
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

        if(tdA < tdB){
          return orderBy === "asc" ? -1 : 1;
        }if (tdA > tdB) {
          return orderBy === "asc" ? 1 : -1;
        }else {
          return 0;
        }
      }, false);

      target.className = orderBy;
      toggleTaskTable();
    }
