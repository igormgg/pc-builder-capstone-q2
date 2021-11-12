import { createContext, useContext, useEffect, useState } from "react";

export const BuildContext = createContext();

export const BuildProvider = ({ children }) => {
  const [buildSchema, setBuildSchema] = useState({
    cpu: [],
    cooler: [],
    gpu: [],
    motherboard: [],
    ram: [],
    drive: [],
    case: [],
    font: [],
    peripherals: [],
  });

  const [buildTotal, setBuildTotal] = useState(0);
  const [buildWatts, setBuildWatts] = useState(0);
  const [buildProducts, setBuildProducts] = useState([]);

  useEffect(() => {
    let products = [];
    for (let key in buildSchema) {
      buildSchema[key].map((item) => products.push(item));
    }
    const totalValue = products.reduce((acc, item) => acc + item.price, 0);
    const totalWatts = products.reduce(
      (acc, item) => (item.psuWattage ? acc + Number(item.psuWattage) : acc),
      0
    );

    setBuildTotal(totalValue);
    setBuildWatts(totalWatts);
    setBuildProducts(products);
  }, [buildSchema]);

  useEffect(() => {
    if (localStorage.getItem("build")) {
      setBuildSchema(JSON.parse(localStorage.getItem("build")));
    }
  }, []);

  console.log(buildProducts);

  const addToBuild = (product, category) => {
    const newSet = {
      ...buildSchema,
      [category]: [...buildSchema[category], product],
    };
    setBuildSchema(newSet);
    localStorage.setItem("build", JSON.stringify(newSet));
  };

  const removeFromBuild = (id, category) => {
    const newSet = {
      ...buildSchema,
      [category]: buildSchema[category].filter((item) => item.id !== id),
    };
    setBuildSchema(newSet);
    localStorage.setItem("build", JSON.stringify(newSet));
  };

  return (
    <BuildContext.Provider
      value={{
        addToBuild,
        buildSchema,
        removeFromBuild,
        buildWatts,
        buildTotal,
      }}
    >
      {children}
    </BuildContext.Provider>
  );
};

export const useBuild = () => useContext(BuildContext);
