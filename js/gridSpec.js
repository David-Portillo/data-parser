import { validator } from "./utils/validator.js";
import { fieldSpecification } from './fieldSpec.js'


const fieldBackdrop = {
  valid: { "background-color": "transparent", color: "white" },
  invalid: { "background-color": "lightcoral" },
  advise: { "background-color": "papayawhip", color: "black" }
}

const getBackdrop = (field, validated) => {
  if(validated === null) return fieldBackdrop.valid
  if (!validated && fieldSpecification[field].advisable) return fieldBackdrop.advise
  else if(!validated) return fieldBackdrop.invalid
  return fieldBackdrop.valid
}
export const columns = [
  {
    headerName: "Make",
    field: "make",
    cellStyle: function(params) {
      const { passed = null } = validator(fieldSpecification,params.colDef.field, params.value);
      return getBackdrop('make', passed)
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
      const { passed = null } = validator(fieldSpecification,params.colDef.field, params.value);
      return getBackdrop('model', passed)
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
      const { passed = null} = validator(fieldSpecification,params.colDef.field, params.value);
      return getBackdrop('price', passed)
    },
    tooltipComponent: "gridTooltip",
    tooltipValueGetter: function(params) {
      return { value: params.value };
    }
  }
];
