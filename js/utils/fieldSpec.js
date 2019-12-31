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
      "advisable",'numbersOnly|{"minValue": "100.50", "maxValue": "100000"}'
    ]
  }
};
