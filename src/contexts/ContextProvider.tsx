import { AuthProvider } from "./authContext";

export function ContextProvider({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}