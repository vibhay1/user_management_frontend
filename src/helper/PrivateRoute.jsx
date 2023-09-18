import { Navigate, Outlet } from "react-router-dom"
import { isLoggedIn } from "../authentication";
const PrivateRoute = ({ isAllowed, redirectPath = '/login', children }) => {
    if (!isLoggedIn()) {
        return <Navigate to={redirectPath} replace={true} />
    }
    return children ? children : <Outlet />;
};
export default PrivateRoute;