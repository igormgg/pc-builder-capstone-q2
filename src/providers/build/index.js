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
    const totalValue = products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const totalWatts = products.reduce(
      (acc, item) =>
        item.psuWattage ? acc + Number(item.psuWattage) * item.quantity : acc,
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
    // reset all msgs
    let errorMsgs = [];

    // set products array - buildProducts doesn't work in this case
    let products = [];
    for (let key in buildSchema) {
      buildSchema[key].map((item) => products.push(item));
    }

    // variables used to check compatibility
    const cpuSocket = buildSchema["cpu"][0]?.socket.replace(/ /g, "") || "";
    const cpuCoolerBox = buildSchema["cpu"][0]?.coolerBox || false;
    const integratedGraphics = buildSchema["cpu"][0]?.graphics || false;
    const moboSocket =
      buildSchema["motherboard"][0]?.socket.replace(/ /g, "") || "";
    const mbSlots = buildSchema["motherboard"][0]?.memory?.slots;
    const mbMax = buildSchema["motherboard"][0]?.memory?.max;
    const mbPcieSlots = buildSchema["motherboard"][0]?.pcie16 || 0;
    const mbM2Slots = buildSchema["motherboard"][0]?.storage?.m2 || 0;
    const mbSataSlots = buildSchema["motherboard"][0]?.storage?.sata || 0;
    const psu = buildSchema["font"][0]?.power || 0;
    const setupTotalWatts = products.reduce(
      (acc, item) =>
        item.psuWattage ? acc + Number(item.psuWattage) * item.quantity : acc,
      0
    );
    const totalSelectedGpus = buildSchema["gpu"].reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const ramTotal = buildSchema["ram"].reduce(
      (acc, item) => acc + item.capacity * item.quantity,
      0
    );
    const ramSlots = buildSchema["ram"].reduce(
      (acc, item) => acc + item.slots * item.quantity,
      0
    );

    //===== check Mobo and CPU compatibility =====
    if (cpuSocket && moboSocket && !moboSocket.includes(cpuSocket)) {
      errorMsgs.push(
        `Incompatibilidade com o Processador - Socket ${cpuSocket}`
      );
      errorMsgs.push(
        `Incompatibilidade com a Placa Mãe - Socket ${moboSocket}`
      );
    }

    //=====  check if CPU includes integraded Graphics =====
    if (cpuSocket && !integratedGraphics && !buildSchema.gpu.length) {
      errorMsgs.push("O processador atual requer uma placa de vídeo dedicada");
    }

    //===== check if CPU includes a Cooler =====
    if (cpuSocket && !cpuCoolerBox && !buildSchema["cooler"].length) {
      errorMsgs.push(
        "O processador atual não acompanha um cooler - Requer adicição de um Cooler à parte"
      );
    }

    //=====  Check Cooler compatibility =====
    const cooler = buildSchema["cooler"][0]?.socketCompatibility || "";
    if (moboSocket && cooler && !cooler.includes(moboSocket)) {
      errorMsgs.push(
        `O Cooler escolhido não possui suporte ao Socket atual: ${moboSocket}`
      );
    }

    //===== check Ram and Mobo compatibility **needs to improve DB info =====
    // console.log(mbMax, ramSlots, ramTotal);
    if (moboSocket && mbMax && ramTotal && ramTotal > mbMax) {
      errorMsgs.push(
        `A quantidade de memória excede o limite da Placa Mãe - Quantidade: ${ramTotal} / ${mbMax}`
      );
    }
    if (moboSocket && ramSlots > mbSlots) {
      errorMsgs.push(
        `A quantidade de pentes de memória (${ramSlots}) excedem a quantidade de slots da Placa Mãe (${mbSlots})`
      );
    }

    //===== Checks if Mobo supports the amount of selected GPUs
    // console.log(mbPcieSlots, totalSelectedGpus);
    if (moboSocket && mbPcieSlots < totalSelectedGpus) {
      errorMsgs.push(
        `A quantidade de placas de vídeo (${totalSelectedGpus}) excedem a quantidade de slots PCI-E da Placa Mãe (${mbPcieSlots})`
      );
    }

    //checks if different gpu models were selected
    const firstSelectedGpu = buildSchema["gpu"][0]?.productID || 0;
    if (
      buildSchema["gpu"].length > 0 &&
      buildSchema["gpu"].some((item) => item.productID !== firstSelectedGpu)
    ) {
      errorMsgs.push(
        `Modelos diferentes de placa de vídeo não serão suportados para SLI ou recomendados para CrossFire`
      );
    }

    //===== Checks if Mobo supports the amount and type of selected Storage Drives
    console.log(mbSataSlots, mbM2Slots);
    const totalOfSelectedM2Drives = buildSchema["drive"].reduce(
      (acc, item) => (item.output === "M2" ? acc + item.quantity : acc),
      0
    );
    const totalOfSelectedSataDrives = buildSchema["drive"].reduce(
      (acc, item) => (item.output === "SATA" ? acc + item.quantity : acc),
      0
    );

    if (moboSocket && totalOfSelectedM2Drives > mbM2Slots) {
      errorMsgs.push(
        `A quantidade de Drives de Armazenamento M2 escolhidos (${totalOfSelectedM2Drives}) excedem o limite da Placa Mãe (${mbM2Slots})`
      );
    }
    if (moboSocket && totalOfSelectedSataDrives > mbSataSlots) {
      errorMsgs.push(
        `A quantidade de Drives de Armazenamento SATA escolhidos (${totalOfSelectedSataDrives}) excedem o limite da Placa Mãe (${mbSataSlots})`
      );
    }

    //===== Checks if Power Suply is enough for the current setup
    if (psu && setupTotalWatts > psu) {
      errorMsgs.push(
        `A fonte escolhida não fornece energia suficiente para o sistema atual: ( ${psu}W / ${setupTotalWatts}W )`
      );
    }

    setCheckErrors(errorMsgs);
  };

  // console.log(buildProducts);
  console.log(checkErrors);

  const addToBuild = (product, category) => {
    const productIncluded = buildSchema[category].find(
      (item) => item.productID === product.productID
    );

    if (productIncluded) {
      const newSet = {
        ...buildSchema,
        [category]: [
          ...buildSchema[category].map((item) =>
            item.productID === product.productID
              ? { ...item, quantity: productIncluded.quantity + 1 }
              : item
          ),
        ],
      };
      setBuildSchema(newSet);
      localStorage.setItem("build", JSON.stringify(newSet));
    } else {
      const newSet = {
        ...buildSchema,
        [category]: [...buildSchema[category], { ...product, quantity: 1 }],
      };
      setBuildSchema(newSet);
      localStorage.setItem("build", JSON.stringify(newSet));
    }
  };

  console.log(buildSchema);

  const removeFromBuild = (id, category) => {
    const categoryUpdated = buildSchema[category]
      .map((item) =>
        item.productID === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    const newSet = {
      ...buildSchema,
      [category]: categoryUpdated,
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
