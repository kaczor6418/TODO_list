(function() {

var form = document.querySelector("#validation"),
    fields = form.querySelectorAll("[data-error]"),
    enterActivity = form.querySelector("input"),
    selectPriority = form.querySelector("select");

function addActivity() {
  var activityTable = document.querySelector("tbody"),
      newSvg1 = '<svg class="checkBox" width="30" height="30" xmlns="http://www.w3.org/2000/svg"> <g><title>background</title><rect fill="none" id="canvas_background" height="402" width="582" y="-1" x="-1"/> </g><g><title>Layer 1</title><rect rx="2" fill-opacity="0" id="svg_2" height="23.022598" width="22.17514" y="3.453391" x="3.947742" stroke-width="1.5" stroke="#b6b6b6" fill="#0fffff"/><path class="changeColor" fill="#e79c49" opacity="0" id="svg_1" d="m24,4l-18,0c-1.105,0 -2,0.895 -2,2l0,18c0,1.105 0.895,2 2,2l18,0c1.105,0 2,-0.895 2,-2l0,-18c0,-1.105 -0.896,-2 -2,-2zm-2.293,7.707l-7.56,7.56c-0.188,0.188 -0.442,0.293 -0.707,0.293s-0.52,-0.105 -0.707,-0.293l-3.453,-3.453c-0.391,-0.391 -0.391,-1.023 0,-1.414s1.023,-0.391 1.414,0l2.746,2.746l6.853,-6.853c0.391,-0.391 1.023,-0.391 1.414,0s0.391,1.023 0,1.414z"/></g></svg>',
      newSvg2 = '<svg enable-background="new 0 0 26 26" id="Слой_1" version="1.1" viewBox="0 0 26 26" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M14.0605469,13L24.7802734,2.2802734c0.2929688-0.2929688,0.2929688-0.7675781,0-1.0605469 s-0.7675781-0.2929688-1.0605469,0L13,11.9394531L2.2802734,1.2197266c-0.2929688-0.2929688-0.7675781-0.2929688-1.0605469,0 s-0.2929688,0.7675781,0,1.0605469L11.9394531,13L1.2197266,23.7197266c-0.2929688,0.2929688-0.2929688,0.7675781,0,1.0605469 C1.3662109,24.9267578,1.5576172,25,1.75,25s0.3837891-0.0732422,0.5302734-0.2197266L13,14.0605469l10.7197266,10.7197266 C23.8662109,24.9267578,24.0576172,25,24.25,25s0.3837891-0.0732422,0.5302734-0.2197266 c0.2929688-0.2929688,0.2929688-0.7675781,0-1.0605469L14.0605469,13z" /></svg>';
  let activity = enterActivity.value,
      priority = selectPriority.value,
      row = activityTable.insertRow(1),
      cell1 = row.insertCell(0),
      cell2 = row.insertCell(1),
      cell3 = row.insertCell(2);

      cell1.innerHTML = activity;
      cell2.innerHTML = priority;
      cell3.innerHTML = newSvg1 + newSvg2;
}

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
    enterActivity.style.background = "#ffc6c6";
    selectPriority.style.background = "#ffc6c6";
  }else {
    addActivity();
  }

console.log(errors);

}, false)
})();
