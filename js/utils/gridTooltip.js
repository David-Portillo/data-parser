export const gridTooltip = function() {};

gridTooltip.prototype.init = function(params) {
  let eGui = (this.eGui = document.createElement("div"));
  eGui.classList.add("grid-tooltip");

  console.log("in tooltip");
  let valueToDisplay = params.value.value ? params.value.value : "- Missing -";

  eGui.innerHTML =
    "<p>Athletes name:</p>" + "<p><span>" + valueToDisplay + "</span></p>";
};

gridTooltip.prototype.getGui = function() {
  return this.eGui;
};
