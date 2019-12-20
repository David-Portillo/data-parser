import { columnDefs, sampleData } from "./grid.js";

let gridOptions = {
  columnDefs,
  rowData: sampleData
};

console.log(columnDefs);
console.log(sampleData);

document.addEventListener("DOMContentLoaded", function() {
  let gridDiv = document.querySelector("#data-grid");
  new agGrid.Grid(gridDiv, gridOptions);
});
