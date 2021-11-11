import { AuthProvider } from "./auth";
import { ModalProvider } from "./modal";

const Providers = ({ children }) => (
    <AuthProvider>
        <ModalProvider>
            {children}
        </ModalProvider>
    </AuthProvider>
)

export default Providers;
