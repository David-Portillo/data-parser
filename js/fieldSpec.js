export const fieldSpecification = {
  make: {
    id: "make",
    tag: "Maker",
    advisable: false,
    rules: ["maxLength|6"]
  },
  model: {
    id: "model",
    tag: "Model",
    advisable: false,
    rules: ['required|true|{"equal": true}', "minLength|7", "maxLength|10"]
  },
  price: {
    id: "price",
    tag: "Price",
    advisable: true,
    rules: ["required|true"]
  }
};

