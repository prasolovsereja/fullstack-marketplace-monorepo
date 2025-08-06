import {Navigate} from "react-router-dom";
import {useAppSelector} from "../slices/hooks";
import {FC} from "react";
type PrivateRouteProps = {
    children: React.ReactNode;
}
const PrivateRoute= ({children}: PrivateRouteProps) => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? children : <Navigate to='http://localhost:3000/login' />
}
export default PrivateRoute;