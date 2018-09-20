var delBtn = document.querySelector("#taskTable thead tr th:last-child");

// this function will delete all tasks from taskTable
delBtn.addEventListener("click", function () {
  if(confirm("Do you want delete all tasks?")){
    var allTasks = document.querySelectorAll("#taskTable tbody tr");
    for (let i = 0; i < allTasks.length - 1; i++) {
      allTasks[i].remove();      
    }
    localStorage.clear();
  }
});