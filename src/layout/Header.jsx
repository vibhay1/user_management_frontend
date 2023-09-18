import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../redux/slices/authSlice";
import { adminAllowedOnly, logout } from "../authentication";
import { useState } from "react";


const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickLogout = () => {
    logout();
    dispatch(userLogout());
    navigate('/login', { replace: true });
  }
  return (
    <nav className="w-full bg-rose-300 shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/">
              <h2 className="text-2xl font-bold text-white"> <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Logo"
              /></h2>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
              }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {!!adminAllowedOnly() && <li className="text-white hover:text-indigo-200">
                <div ><Link to={'/user/add'}>Add User</Link></div>
              </li>}
              <li className="text-white hover:text-indigo-200">
                <div to={"#"} onClick={onClickLogout} style={{ cursor: 'pointer' }}>Logout</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    // <div className="bg-yellow-600 py-4">
    //   <div className="container mx-auto">
    //     <div className="flex flex-row justify-end">
    //       <Link to='/user/add' key={'add'}>
    //         <div className="px-4">
    //           <p className="text-white capitalize">Add User</p>
    //         </div>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    // <div className="bg-indigo-500 text-indigo-50">
    //   <header>
    //     <ul className="list-none flex justify-center gap-4">
    //       <li className="p-2">Home</li>
    //       <li className="p-2">Blog</li>
    //       <li className="p-2">About</li>
    //       <li className="p-2"><Link to={'/user/add'}>Add User</Link></li>
    //     </ul>
    //   </header>
    // </div>
    // <div>
    //   Header
    //   <div to={"#"} onClick={onClickLogout}>Logout</div>
    //   <div ><Link to={'/user/add'}>Add User</Link></div>
    // </div>
  )
}


export default Header