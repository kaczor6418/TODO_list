(function() {
  var check = document.querySelector(".checkBox"),
      counter = true;

  check.addEventListener("click", function (e) {
    if(counter){
      check.querySelector("path").classList.add("done");
      counter = false;
    } else {
      check.querySelector("path").classList.remove("done");
      counter = true;
    }
  },false);
})();
