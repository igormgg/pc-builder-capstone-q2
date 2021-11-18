import { AuthProvider } from "./auth";
import { ModalProvider } from "./modal";
import { BuildProvider } from "./build";
import UserProvider from "./userData";
import { CartProvider } from "./cart";

const Providers = ({ children }) => (
  <AuthProvider>
    <CartProvider>
      <UserProvider>
        <BuildProvider>
          <ModalProvider>{children}</ModalProvider>
        </BuildProvider>
      </UserProvider>
    </CartProvider>
  </AuthProvider>
);

export default Providers;
