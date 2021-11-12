import {
  createContext,
  useContext,
  usteState,
  useEffect,
  useState,
} from "react";

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

  useEffect(() => {
    if (localStorage.getItem("build")) {
      setBuildSchema(JSON.parse(localStorage.getItem("build")));
    }
  }, []);

  const addToBuild = (product, category) => {
    const newSet = {
      ...buildSchema,
      [category]: [
        ...buildSchema[category],
        { ...product, id: buildSchema[category].length + 1 },
      ],
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
    <BuildContext.Provider value={{ addToBuild, buildSchema, removeFromBuild }}>
      {children}
    </BuildContext.Provider>
  );
};

export const useBuild = () => useContext(BuildContext);
