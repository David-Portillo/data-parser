export const fieldSpecification = {
  make: {
    id: "make",
    tag: "Maker",
    aliases: [
      "make",
      "maker",
      "manufacturer",
      "builder",
      "contructor",
      "originator",
    ],
    rules: ["maxLength|6"],
  },
  model: {
    id: "model",
    tag: "Model",
    aliases: ["model", "representation", "style", "design", "archetype"],
    rules: ["required|true", "minLength|7", "maxLength|10"],
  },
  price: {
    id: "price",
    tag: "Price",
    aliases: ["price", "value", "cost", "asking price", "amount", "valuation"],
    rules: [
      "advisable",
      'numbersOnly|{"minValue": "100.50", "maxValue": "100000"}',
    ],
  },
  date: {
    id: "date",
    tag: "Date",
    aliases: ["date", "date manufactured", "assignation"],
    rules: ["required|false", 'dateField|{"format": "DD/MM/YYYY"}'],
  },
};

export const aliases = () => {
  return Object.keys(fieldSpecification).map((k) => {
    return { [k]: fieldSpecification[k].aliases };
  });
};
export const fieldKeys = Object.keys(fieldSpecification);
