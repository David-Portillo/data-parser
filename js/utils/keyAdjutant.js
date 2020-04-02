import { overseer } from "./overseer.js";
import { aliases } from "../specs/fieldSpec.js";

function KeyAdjutant(dataSet) {
  let _dataSet = dataSet;

  Object.defineProperty(this, "normalize", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function (keyCase = "lower") {
      let normalizedDataSet = [];

      _dataSet.forEach((obj) => {
        normalizedDataSet.push(
          Object.keys(obj).reduce((acc, key) => {
            return {
              ...acc,
              [keyCase === "upper"
                ? key.toLocaleUpperCase(overseer.locale)
                : key.toLocaleLowerCase(overseer.locale)]: obj[key],
            };
          }, {})
        );
      });
      _dataSet = normalizedDataSet;
      return this;
    },
  });

  Object.defineProperty(this, "remove", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function (strip = []) {
      _dataSet.map((obj) => {
        Object.keys(obj).map((key) => {
          if (strip.includes(key)) return delete obj[key];
        });
      });
      return this;
    },
  });

  Object.defineProperty(this, "inspect", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function () {
      console.log("system field and aliases: ", aliases());
      console.log("external field headers: ", _dataSet);
      return {};
    },
  });

  Object.defineProperty(this, "val", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function () {
      return _dataSet;
    },
  });

  Object.preventExtensions(this);
}

export const keyAdjutant = (dataSet = []) => new KeyAdjutant(dataSet);
