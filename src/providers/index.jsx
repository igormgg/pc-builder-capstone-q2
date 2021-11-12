import { AuthProvider } from "./auth";
import { BuildProvider } from "./build";

const Providers = ({ children }) => (
  <AuthProvider>
    <BuildProvider>{children}</BuildProvider>
  </AuthProvider>
);

export default Providers;
