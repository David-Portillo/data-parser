export const fieldSpecification = {
  make: {
    id: "make",
    tag: "Maker",
    rules: ["maxLength|6"]
  },
  model: {
    id: "model",
    tag: "Model",
    rules: ["required|true", "minLength|7", "maxLength|10"]
  },
  price: {
    id: "price",
    tag: "Price",
    rules: [
      "advisable",
      'numbersOnly|{"min": "1.00", "max" : "indef", "decimals": 2, "padding" : "4:-"}'
    ]
  }
};
