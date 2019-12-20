import { columnDefs, sampleData } from "./grid.js";

let gridOptions = {
  defaultColDef: {
    editable: true
  },
  columnDefs,
  rowData: sampleData,

  // grid methods

  onGridReady: function(params) {
    params.api.sizeColumnsToFit();
  },
  onCellEditingStarted: function(event) {
    console.log("cellEditingStarted");
  },
  onCellEditingStopped: function(event) {
    console.log("cellEditingStopped");
    console.log(this.rowData);
  }
};

console.log(columnDefs);
console.log(sampleData);

document.addEventListener("DOMContentLoaded", function() {
  let gridDiv = document.querySelector("#data-grid");
  new agGrid.Grid(gridDiv, gridOptions);
});
