export const fieldMessage = (adjutant, field, value, rule) => {
    if(adjutant === 'required') return `${field} cannot be empty`
    else if(adjutant === 'minLength') return `${field} must be at least ${rule} characters long <br/> you've provided ${value.length}`
    else if(adjutant === 'maxLength') return `${field} cannot be more than ${rule} characters <br /> you've provided ${value.length}`
    return;
  };
  