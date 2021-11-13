import { AuthProvider } from "./auth";
import { ModalProvider } from "./modal";
import { BuildProvider } from "./build";

const Providers = ({ children }) => (
  <AuthProvider>
    <BuildProvider>
      <ModalProvider>
        {children}
      </ModalProvider>
    </BuildProvider>
  </AuthProvider>
)

export default Providers;
