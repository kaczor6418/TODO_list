var trsArr;
var thsArr;
var table;
var documentFragment = document.createDocumentFragment();
function initSortElements(janu){
    table = document.querySelector("#taskTable"),
    ths = table.querySelectorAll("thead th"),
    trs = table.querySelectorAll("tbody tr");

    thsArr = makeArray(ths);
    trsArr = makeArray(janu);

    ths[0].onclick = sortByTask;
    ths[1].onclick = sortByTask;
    ths[2].onclick = sortByTask;
}

    function addTaskToSortingArray(task) {
        trsArr.push(task);
    }

    function removeTaskFromSortingArray(taskIndex) {
        trsArr.splice(taskIndex, 1);
    }

    function makeArray(nodeList) {
      var arr = [];
      for (let i = 0; i < nodeList.length; i++) {
        arr.push(nodeList[i]);
      }
      return arr;
    }

    function toggleTakTable() {
      trsArr.forEach(function(trTask) {
        documentFragment.appendChild(trTask);
      }, false);

      table.querySelector("tbody").appendChild(documentFragment);
    }

    function sortByTask(e) {
      var target = e.target,
          index = thsArr.indexOf(target);

      trsArr.sort(function (a, b) {

        let tdA = a.children[index].textContent,
            tdB = b.children[index].textContent;

        if(tdA < tdB){
          return -1;
        }if (tdA > tdB) {
          return 1;
        }else {
          return 0;
        }
      }, false);

      toggleTakTable();
    }
