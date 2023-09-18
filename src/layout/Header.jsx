import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../redux/slices/authSlice";
import { logout } from "../authentication";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickLogout = () => {
    logout();
    dispatch(userLogout());
    navigate('/login', { replace: true });
  }
  return (
    <div>
      Header
      <div to={"#"} onClick={onClickLogout}>Logout</div>
      <div ><Link to={'/user/add'}>Add User</Link></div>
    </div>
  )
}


export default Header