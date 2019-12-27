import { parseRule, parseOption, parseValue } from "./parser.js";
import { fieldMessage } from './messages.js'

const adjutant = {
  required: (field, rule, value, opt) => {
    if (parseRule(rule) && parseValue(value).length === 0)
      return { passed: false, result: fieldMessage('required', field) }
    return { passed: true, result: '' };
  },
  minLength: (field, rule, value, opt) => {
    if (parseValue(value).length < rule)
      return  { passed: false, result: fieldMessage('minLength', field, parseValue(value), rule)}
    return { passed: true, result: '' };
  },

  maxLength: (field, rule, value, opt) => {
    if (parseValue(value).length > rule)
      return  { passed: false, result: fieldMessage('maxLength', field, parseValue(value), rule)}
    return { passed: true, result: '' };
  }
};

export const validator = (fieldSpecification, field, value) => {
  let validation = {};
  
  for (const ruling of fieldSpecification[field].rules) {
    const [designation, rule, opt = null] = ruling.split("|");

    if (designation in adjutant) {
      validation = adjutant[designation](field, rule, value, opt);
      if (!validation.passed) return validation;
    }
  }
  return validation;
};
