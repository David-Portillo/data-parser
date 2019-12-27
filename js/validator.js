import { parseRule, parseOption } from "./utils/parser.js";

const fieldRules = {
  model: ['required|true|{"equal": true}', "minLength|7", "maxLength|10"],
  make: ["maxLength|6"],
  price: ["required|false"]
};

const outcome = {
  validField: { "background-color": "transparent", color: "white" },
  invalidField: { "background-color": "lightcoral" },
  advise: { "background-color": "papayawhip", color: "black" }
};

const advisableFields = ["price"];

const transmogrify = value => {
  if (value === undefined || value === null) return "";
  return value.toString();
};

const adjutant = {
  required: (field, rule, value, opt, yieldMessage = false) => {
    if (
      !parseRule(rule) &&
      advisableFields.includes(field) &&
      transmogrify(value).length === 0
    )
      return { passed: false, result: outcome.advise };
    if (parseRule(rule) && transmogrify(value).length === 0)
      return yieldMessage
        ? { passed: false, result: `${field} cannot be empty` }
        : { passed: false, result: outcome.invalidField };

    return { passed: true, result: outcome.validField };
  },
  minLength: (field, rule, value, opt, yieldMessage = false) => {
    if (transmogrify(value).length < rule)
      return yieldMessage
        ? {
            passed: false,
            result: `${field} must be at least ${rule} characters long`
          }
        : { passed: false, result: outcome.invalidField };
    return { passed: true, result: outcome.validField };
  },

  maxLength: (field, rule, value, opt, yieldMessage = false) => {
    if (transmogrify(value).length > rule)
      return yieldMessage
        ? {
            passed: false,
            result: `${field} cannot be more than ${rule} characters`
          }
        : { passed: false, result: outcome.invalidField };
    return { passed: true, result: outcome.validField };
  }
};

export const validator = (field, value, yieldMessage = false) => {
  let validation = {};
  for (const ruling of fieldRules[field]) {
    const [designation, rule, opt = null] = ruling.split("|");

    if (designation in adjutant) {
      const { passed, result } = adjutant[designation](
        field,
        rule,
        value,
        opt,
        yieldMessage
      );
      validation = result;
      if (!passed) return validation;
    }
  }
  return validation;
};
