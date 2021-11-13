import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
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
  const [checkErrors, setCheckErrors] = useState({});

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
    checkCompatibility();
  }, [buildSchema]);

  useEffect(() => {
    if (localStorage.getItem("build")) {
      setBuildSchema(JSON.parse(localStorage.getItem("build")));
    }
  }, []);

  const checkCompatibility = () => {
    // reset all props
    let errorsStatus = {
      cpu: "",
      cooler: "",
      gpu: "",
      motherboard: "",
      ram: "",
      drive: "",
      case: "",
      font: "",
      peripherals: "",
    };

    //check Mobo and CPU compatibility
    const cpu = buildSchema["cpu"][0]?.socket.replace(/ /g, "") || "";
    const integratedGraphics = buildSchema["cpu"][0]?.graphics || false;
    const mobo = buildSchema["motherboard"][0]?.socket.replace(/ /g, "") || "";
    if (cpu && mobo && !mobo.includes(cpu)) {
      errorsStatus = {
        ...errorsStatus,
        cpu: `Incompatibilidade com o Processador - Socket ${cpu}`,
        motherboard: `Incompatibilidade com a Placa Mãe - Socket ${mobo}`,
      };
    }

    if (cpu && !integratedGraphics && mobo && !buildSchema["gpu"].length) {
      errorsStatus = {
        ...errorsStatus,
        gpu: `Processador atual não possui vídeo integrado; Requer adicição de uma Placa de Vídeo dedicada`,
      };
    }

    // Check Cooler compatibility

    const cooler = buildSchema["cooler"][0]?.socketCompatibility || "";
    if (cpu && cooler && !cooler.includes(cpu)) {
      errorsStatus.cooler = `O Cooler escolhido não possui suporte ao Socket atual: ${cpu}`;
    }

    //check Ram and Mobo compatibility **needs to improve DB info
    const mbSlots = buildSchema["motherboard"][0]?.memory?.slots;
    const mbMax = buildSchema["motherboard"][0]?.memory?.max;
    const ramTotal = buildSchema["ram"].reduce(
      (acc, item) => acc + item.capacity,
      0
    );
    const ramSlots = buildSchema["ram"].length;
    if (mbMax && ramTotal && ramTotal > mbMax) {
      errorsStatus = {
        ...errorsStatus,
        ram: `A quantidade de memória excede o limite da Placa Mãe - Quantidade: ${ramTotal}`,
        motherboard: `Quantidade de memória excede os limites da Placa Mãe - Limite: ${mbMax}`,
      };
    } else if (ramSlots > mbSlots) {
      errorsStatus = {
        ...errorsStatus,
        ram: `A quantidade de memória excede a quantidade de slots da Placa Mãe - Quantidade: ${ramSlots}`,
        motherboard: `Quantidade de pentes de memória excede os limites da Placa Mãe - Limite: ${mbSlots}`,
      };
    }
    console.log("Ram slots and MB Slots", ramSlots, mbSlots);

    setCheckErrors(errorsStatus);
  };

  console.log(buildProducts);
  console.log(checkErrors);

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
    const userId = localStorage.getItem("userID");

    if (token) {
      buildProducts.map((item) => {
        api.post(
          "/cart/",
          { ...item, userId: userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      });
      toast.success("Produtos enviados ao carrinho");
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
    } else {
      toast.info("Efetue login para finalizar a montagem");
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
