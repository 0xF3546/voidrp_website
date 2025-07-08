import { useEffect } from "react";
import { useAuthProvider } from "../../../hooks/useAuthProvider";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../AppRouter";

const LogoutPage = () => {
    const { logout } = useAuthProvider();
    const navigate = useNavigate();
    useEffect(() => {
        logout();
        navigate(AppRoutes.LOGIN.path);
    }, [logout]);
}

export default LogoutPage;