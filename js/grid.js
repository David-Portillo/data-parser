import { validator } from "./validator.js";
export const columns = [
  {
    headerName: "Make",
    field: "make",
    cellStyle: function(params) {
      return validator(params.colDef.field, params.value);
    }
  },
  {
    headerName: "Model",
    field: "model",
    cellStyle: function(params) {
      return validator(params.colDef.field, params.value);
    }
  },
  {
    headerName: "Price",
    field: "price",
    cellStyle: function(params) {
      return validator(params.colDef.field, params.value);
    }
  }
];
