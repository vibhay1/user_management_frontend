import { Navigate, Outlet } from "react-router-dom"
import { adminAllowedOnly, isLoggedIn } from "../authentication";
const AdminRoute = ({ redirectPath = '/', children }) => {
    if (!isLoggedIn() || !adminAllowedOnly()) {
        return <Navigate to={redirectPath} replace={true} />
    }
    return children ? children : <Outlet />;
};
export default AdminRoute;