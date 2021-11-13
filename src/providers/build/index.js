import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import api from "../../services/api";
import { useAuth } from "../auth";

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
  const { token } = useAuth();
  const history = useHistory();
  const [userId, setUserId] = useState(localStorage.getItem("userID") || "");

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
    const targetIndex = buildSchema[category].findIndex(
      (item) => item.productID === id
    );

    const newSet = {
      ...buildSchema,
      [category]: buildSchema[category].filter(
        (_, index) => index !== targetIndex
      ),
    };

    setBuildSchema(newSet);
    localStorage.setItem("build", JSON.stringify(newSet));
  };

  const buildCheckout = () => {
    if (token) {
      buildProducts.map((item) => {
        api
          .post(
            "/cart/",
            { ...item, userId: userId },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(() => {
            localStorage.removeItem("build");
            setBuildSchema({
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
            history.push("/cart/");
          });
      });
    } else {
      history.push("/sign");
    }
  };

  return (
    <BuildContext.Provider
      value={{
        addToBuild,
        buildSchema,
        removeFromBuild,
        buildWatts,
        buildTotal,
        buildCheckout,
      }}
    >
      {children}
    </BuildContext.Provider>
  );
};

export const useBuild = () => useContext(BuildContext);
