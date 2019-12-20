const rules = {
  model: ["required:true", "minLength:7", "maxLength:30"]
};

const adjutant = {
  minLength: (value, rule, opt) => {
    if (!value) return "field-error";
    else if (value.length < rule) return { "background-color": "lightcoral" };
    else return true;
  }
};

export const validator = (column, value) => {
  for (let ruling of rules[column]) {
    let validate = ruling.split(":");
    if (validate[0] in adjutant)
      return adjutant[validate[0]](value, validate[1], validate[2]);
  }
};
