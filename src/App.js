import GlobalStyle from "./styles/GlobalStyle";
import Routes from "./routes";
import { useModal } from "./providers/modal";

function App() {
  const { isOpen, contactsOpen } = useModal();

  return (
    <>
      <GlobalStyle isOpen={isOpen} contactsOpen={contactsOpen} />
      <div className="App">
        <Routes />
      </div>
    </>
  );
}

export default App;
