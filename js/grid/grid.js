import { fieldSpecification as fieldSpec } from "../specs/fieldSpec.js";
import { validator } from "../utils/validator.js";
import { gridTooltip } from "./gridTooltip.js";

const fieldBackdrop = {
  valid: { "background-color": "transparent", color: "white" },
  invalid: { "background-color": "lightcoral", color: "white" },
  advise: { "background-color": "papayawhip", color: "black" },
};

const getBackdrop = (validated, advisable) => {
  if (advisable) return fieldBackdrop.advise;
  else if (!validated) return fieldBackdrop.invalid;
  return fieldBackdrop.valid;
};

// Grid Columns

const columns = [
  {
    headerName: fieldSpec["make"].tag,
    field: "make",
    cellStyle: function (params) {
      const { passed = null, advisable = null } = validator(
        fieldSpec,
        params.colDef.field,
        params.value
      );
      return getBackdrop(passed, advisable);
    },
    tooltipComponent: "gridTooltip",
    tooltipValueGetter: function (params) {
      return { value: params.value };
    },
    valueGetter: function (params) {
      return params.data.make ? params.data.make.toString().trim() : "";
    },
  },
  {
    headerName: fieldSpec["model"].tag,
    field: "model",
    cellStyle: function (params) {
      const { passed = null, advisable = null } = validator(
        fieldSpec,
        params.colDef.field,
        params.value
      );
      return getBackdrop(passed, advisable);
    },
    tooltipComponent: "gridTooltip",
    tooltipValueGetter: function (params) {
      return { value: params.value };
    },
    valueGetter: function (params) {
      return params.data.model ? params.data.model.toString().trim() : "";
    },
  },
  {
    headerName: fieldSpec["price"].tag,
    field: "price",
    cellStyle: function (params) {
      const { passed = null, advisable = null } = validator(
        fieldSpec,
        params.colDef.field,
        params.value
      );
      return getBackdrop(passed, advisable);
    },
    tooltipComponent: "gridTooltip",
    tooltipValueGetter: function (params) {
      return { value: params.value };
    },
    valueGetter: function (params) {
      return params.data.price ? params.data.price.toString().trim() : "";
    },
  },
  {
    headerName: fieldSpec["date"].tag,
    field: "date",
    cellStyle: function (params) {
      const { passed = null, advisable = null } = validator(
        fieldSpec,
        params.colDef.field,
        params.value
      );
      return getBackdrop(passed, advisable);
    },
    tooltipComponent: "gridTooltip",
    tooltipValueGetter: function (params) {
      return { value: params.value };
    },
    valueGetter: function (params) {
      return params.data.date ? params.data.date.toString().trim() : "";
    },
  },
];

// Grid

export let grid = {
  defaultColDef: {
    editable: true,
  },
  columnDefs: columns,
  rowData: [],
  components: { gridTooltip },
  enableCellChangeFlash: true,

  // grid methods

  onGridReady: function (params) {
    params.api.sizeColumnsToFit();
  },
  onCellEditingStarted: function (params) {
    console.log("cellEditingStarted");
  },
  onCellEditingStopped: function (params) {
    console.log("cellEditingStopped");
    params.api.forEachNode(function (rowNode, index) {
      console.log(rowNode.data);
    });
  },
};
