// Parse rule

export const parseRule = rule => {
  if (rule === "true") return true;
  if (rule === "false") return false;
  if (!isNaN(rule)) {
    try {
      if (`'${rule}'`.includes(".")) return parseFloat(rule);
      return parseInt(rule);
    } catch (error) {
      console.log(`unable to parse ${rule} error: ${error}`);
    }
  }
  return rule;
};

// parse opt object

export const parseOption = opt => {
  try {
    return JSON.parse(opt);
  } catch (error) {
    console.log(`unable to parse option ${opt} error: ${error}`);
  }
  return opt;
};
