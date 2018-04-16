(function() {

var form = document.querySelector("#validation"),
    fields = form.querySelectorAll("[data-error]"),
    changeColor1 = form.querySelector("input"),
    changeColor2 = form.querySelector("select");

function isEmpty(field) {
  return field.value !== "";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let errors = [];

  for (let i = 0; i < fields.length; i++) {
    let field = fields[i],
        isValid = null;

    switch (field.type) {
      case "text":
        isValid = isEmpty(field);
        break;
      case "select-one":
        isValid = isEmpty(field);
        break;
      default:
    }

    if (!isValid) {
      field.classList.add("error");
      errors.push(field.dataset.error);
    }else {
      field.classList.remove("error");
    }
  }
  if(errors.length) {
    changeColor1.style.background = "#ffc6c6";
    changeColor2.style.background = "#ffc6c6";
  }else {
    form.submit();
  }

console.log(errors);

}, false)
})();
