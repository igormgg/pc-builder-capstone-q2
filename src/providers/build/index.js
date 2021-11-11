import {
  createContext,
  useContext,
  usteState,
  useEffect,
  useState,
} from "react";

export const BuildContext = createContext();

export const BuildProvider = ({ children }) => {
  const [build, setBuild] = useState({});

  useEffect(() => {
    if (localStorage.getItem("build")) {
      setBuild(JSON.parse(localStorage.getItem("build")));
    } else {
      const buildSchema = {
        cpu: [],
        gpu: [],
        motherboard: [],
        ram: [],
        drive: [],
        case: [],
        font: [],
        peripherals: [],
      };
      setBuild(buildSchema);
      localStorage.setItem("build", JSON.stringify(buildSchema));
    }
  }, []);

  const addToBuild = (product, category) => {
    console.log("Add to build: ", product, category);
  };

  return (
    <BuildContext.Provider value={{ build, addToBuild }}>
      {children}
    </BuildContext.Provider>
  );
};

export const useBuild = () => useContext(BuildContext);
