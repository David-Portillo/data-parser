import { parseRule, parseOption, parseValue } from "./parser.js";
import { fieldMessage } from './messages.js'

const adjutant = {
  required: (rule, value, field, opt) => {
    if (parseRule(rule) && parseValue(value).length === 0)
      return { passed: false, message: fieldMessage('required', null, rule, field,)}
    return { passed: true, message: '' };
  },
  minLength: (rule, value, field, opt) => {
    if (parseValue(value).length < rule)
      return  { passed: false, message: fieldMessage('minLength', parseValue(value), rule, field)}
    return { passed: true, message: '' };
  },

  maxLength: (rule, value, field, opt) => {
    if (parseValue(value).length > rule)
      return  { passed: false, message: fieldMessage('maxLength', parseValue(value), rule, field)}
    return { passed: true, message: '' };
  }
};

export const validator = (fieldSpecification, field, value) => {
  let validation = {};
  
  for (const ruling of fieldSpecification[field].rules) {
    const [designation, rule, opt = null] = ruling.split("|");
 
    if (designation in adjutant) {
      validation = adjutant[designation](rule, value, field, opt);
      if (!validation.passed) return validation;
    }
  }
  return validation;
};
