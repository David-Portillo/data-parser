import { fieldSpecification } from '../fieldSpec.js'

const advisableFields = ["price"]

export const fieldMessage = (adjutant, value, rule, field) => {
    if(adjutant === 'required') {
      return advisableFields.includes(field) ? 
        `${fieldSpecification[field].tag} can be empty, but providing this<br/>information would help us determine the tax` : 
        `${fieldSpecification[field].tag} cannot be empty`
    } 
    else if(adjutant === 'minLength') {
      return `${fieldSpecification[field].tag} must be at least ${rule} characters long.<br/>You've provided ${value.length} characters`
    }
    else if(adjutant === 'maxLength') {
      return `${fieldSpecification[field].tag} cannot exceed ${rule} characters.<br/>You've provided ${value.length} characters`
    }
      return;
  };
  