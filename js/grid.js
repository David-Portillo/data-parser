import { validator } from "./validator.js";
export const columns = [
  {
    headerName: "Make",
    field: "make"
    // cellStyle: function(params) {
    //   console.log("maker params: ", params);
    //   validator(params.column.colId, params.value);
    // }
  },
  {
    headerName: "Model",
    field: "model",
    cellStyle: function(params) {
      console.log("model params: ", params);
      //validator(params.column.colId, params.value);
      return validator(params.colDef.field, params.value);
    }
  },
  { headerName: "Price", field: "price" }
];
