import { AuthProvider } from "./auth";
import { ModalProvider } from "./modal";
import { BuildProvider } from "./build";
import UserProvider from "./userData";

const Providers = ({ children }) => (
  <AuthProvider>
    <UserProvider>
      <BuildProvider>
        <ModalProvider>{children}</ModalProvider>
      </BuildProvider>
    </UserProvider>
  </AuthProvider>
);

export default Providers;
