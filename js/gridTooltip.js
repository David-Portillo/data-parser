import { validator } from "./utils/validator.js";
import {fieldSpecification} from './fieldSpec.js'
export const gridTooltip = function() {};

gridTooltip.prototype.init = function(params) {
  let eGui = (this.eGui = document.createElement("div"));
  eGui.classList.add("grid-tooltip");

  console.log("in grid tooltip");

  const { message = null} = validator(fieldSpecification, params.colDef.field, params.value.value, true);
  let valueToDisplay = params.value.value ? params.value.value : "- Missing -";

  eGui.innerHTML =
    "<p>Maker name:</p>" +
    "<p><span>" +
    valueToDisplay +
    "</span></p>" +
    "<p><span>" +
    message +
    "</span></p>";
};

gridTooltip.prototype.getGui = function() {
  return this.eGui;
};
