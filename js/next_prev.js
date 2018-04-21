// Rows per page that user chose
var rowsPerPage = document.querySelector("#rows-per-page").value;

// Array of prev elements
var prev = {

  // Stores completed tasks
  completed: {
    taskName: [],
    taskPriority: []
  } ,

  // Stores todo tasks
  todo:{
    taskName: [],
    taskPriority: []
  }
};

// Array of next elements
var next = {

  // Stores completed tasks
  completed: {
    taskName: [],
    taskPriority: []
  } ,

  // Stores todo tasks
  todo:{
    taskName: [],
    taskPriority: []
  }
};
