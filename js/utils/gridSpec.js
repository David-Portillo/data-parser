import { validator } from "./validator.js";
import { fieldSpecification as fieldSpec } from './fieldSpec.js'

const fieldBackdrop = {
  valid: { "background-color": "transparent", color: "white" },
  invalid: { "background-color": "lightcoral" },
  advise: { "background-color": "papayawhip", color: "black" }
}

const getBackdrop = (validated, advisable) => {
  if(advisable) return fieldBackdrop.advise
  else if(!validated) return fieldBackdrop.invalid
  return fieldBackdrop.valid
}
export const columns = [
  {
    headerName: "Make",
    field: "make",
    cellStyle: function(params) {
      const { passed = null, advisable = null } = validator(fieldSpec,params.colDef.field, params.value);
      return getBackdrop(passed, advisable)
    },
    tooltipComponent: "gridTooltip",
    tooltipValueGetter: function(params) {
      return { value: params.value };
    }
  },
  {
    headerName: "Model",
    field: "model",
    cellStyle: function(params) {
      const { passed = null, advisable = null } = validator(fieldSpec,params.colDef.field, params.value);
      return getBackdrop(passed, advisable)
    },
    tooltipComponent: "gridTooltip",
    tooltipValueGetter: function(params) {
      return { value: params.value };
    }
  },
  {
    headerName: "Price",
    field: "price",
    cellStyle: function(params) {
      const { passed = null, advisable = null } = validator(fieldSpec,params.colDef.field, params.value);
      return getBackdrop(passed, advisable)
    },
    tooltipComponent: "gridTooltip",
    tooltipValueGetter: function(params) {
      return { value: params.value };
    }
  }
];
