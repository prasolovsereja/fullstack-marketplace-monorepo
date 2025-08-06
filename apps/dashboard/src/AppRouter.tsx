import { Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import {FC} from "react";
import PrivateRoute from "./utils/PrivateRoute";

const AppRouter: FC = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={
                <PrivateRoute>
                    <MainPage />
                </PrivateRoute>
                }
            />
        </Routes>
    )
}
export default AppRouter;