import GlobalStyle from "./styles/GlobalStyle";
import Routes from "./routes";
import { useModal } from "./providers/modal";

function App() {
  const { isOpen } = useModal();

  return (
    <>
      <GlobalStyle isOpen={isOpen} />
      <div className="App">
        <Routes />
      </div>
    </>
  );
}

export default App;
