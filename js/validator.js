const fieldRules = {
  model: ["required|true|{equal: true}", "minLength|7", "maxLength|10"],
  make: ["maxLength|6"],
  price: ["required|false"]
};

const advisableFields = ["price"];

const outcome = {
  validField: { "background-color": "transparent" },
  invalidField: { "background-color": "lightcoral" },
  advise: { "background-color": "papayawhip", color: "black" }
};

const transmogrify = value => {
  if (value === undefined || value === null) return "";
  return value;
};

const adjutant = {
  required: (field, rule, value, opt) => {
    if (
      rule === "false" &&
      advisableFields.includes(field) &&
      transmogrify(value).length === 0
    )
      return { passed: false, result: outcome.advise };
    if (rule === "true" && transmogrify(value).length === 0)
      return { passed: false, result: outcome.invalidField };

    return { passed: true, result: outcome.validField };
  },
  minLength: (field, rule, value, opt) => {
    if (transmogrify(value).length < rule)
      return { passed: false, result: outcome.invalidField };
    return { passed: true, result: outcome.validField };
  },

  maxLength: (field, rule, value, opt) => {
    if (transmogrify(value).length > rule)
      return { passed: false, result: outcome.invalidField };
    return { passed: true, result: outcome.validField };
  }
};

export const validator = (field, value) => {
  let validation = {};
  for (const ruling of fieldRules[field]) {
    const [designation, rule, opt = null] = ruling.split("|");

    if (designation in adjutant) {
      const { passed, result } = adjutant[designation](field, rule, value, opt);
      validation = result;
      if (!passed) return validation;
    }
  }
  return validation;
};
