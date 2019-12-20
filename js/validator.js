const rules = {
  make: [""]
};

export const validator = (column, value) => {
  // if(column === 'Make') {
  //     if(value === 'Toyota')
  // }
  console.log("column: ", column);
  console.log("value: ", value);

  return "field-error";
};
