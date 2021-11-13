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
  const [checkErrors, setCheckErrors] = useState([]);

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
    let errorMsgs = [];

    // variables used to check compatibility
    const cpuSocket = buildSchema["cpu"][0]?.socket.replace(/ /g, "") || "";
    const cpuCoolerBox = buildSchema["cpu"][0]?.coolerBox || false;
    const integratedGraphics = buildSchema["cpu"][0]?.graphics || false;
    const moboSocket =
      buildSchema["motherboard"][0]?.socket.replace(/ /g, "") || "";
    const mbSlots = buildSchema["motherboard"][0]?.memory?.slots;
    const mbMax = buildSchema["motherboard"][0]?.memory?.max;
    const ramTotal = buildSchema["ram"].reduce(
      (acc, item) => acc + item.capacity,
      0
    );
    const ramSlots = buildSchema["ram"].length;

    //check Mobo and CPU compatibility
    if (cpuSocket && moboSocket && !moboSocket.includes(cpuSocket)) {
      errorMsgs.push(
        `Incompatibilidade com o Processador - Socket ${cpuSocket}`
      );
      errorMsgs.push(
        `Incompatibilidade com a Placa Mãe - Socket ${moboSocket}`
      );
    }

    //check if CPU includes integraded Graphics
    if (cpuSocket && !integratedGraphics && !buildSchema.gpu.length) {
      errorMsgs.push("O processador atual requer uma placa de vídeo dedicada");
    }

    //check if CPU includes a Cooler
    if (cpuSocket && !cpuCoolerBox && !buildSchema["cooler"].length) {
      errorMsgs.push(
        "O processador atual não acompanha um cooler - Requer adicição de um Cooler à parte"
      );
    }

    console.log(cpuCoolerBox);

    // Check Cooler compatibility

    const cooler = buildSchema["cooler"][0]?.socketCompatibility || "";
    if (moboSocket && cooler && !cooler.includes(moboSocket)) {
      errorMsgs.push(
        `O Cooler escolhido não possui suporte ao Socket atual: ${moboSocket}`
      );
    }

    //check Ram and Mobo compatibility **needs to improve DB info

    console.log(mbMax, ramTotal);
    if (mbMax && ramTotal && ramTotal > mbMax) {
      errorMsgs.push(
        `A quantidade de memória excede o limite da Placa Mãe - Quantidade: ${ramTotal} / ${mbMax}`
      );
    } else if (ramSlots > mbSlots) {
      errorMsgs.push(
        `A quantidade de memória excede a quantidade de slots da Placa Mãe - Quantidade: ${ramSlots}`
      );
    }
    // console.log("Ram slots and MB Slots", ramSlots, mbSlots);

    // setCheckErrors(errorsStatus);

    console.log(integratedGraphics);
    setCheckErrors(errorMsgs);
  };

  // console.log(buildProducts);
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
        checkErrors,
      }}
    >
      {children}
    </BuildContext.Provider>
  );
};

export const useBuild = () => useContext(BuildContext);
