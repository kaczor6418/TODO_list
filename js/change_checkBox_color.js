(function() {
  var check = document.querySelector(".checkBox");

  check.addEventListener("click", function (e) {
    if(check.querySelector(".changeColor").style.opacity === "0"){
      check.querySelector(".changeColor").style.opacity = "1";
    } else {
      check.querySelector(".changeColor").style.opacity = "0";
    }
  },false);
})();
