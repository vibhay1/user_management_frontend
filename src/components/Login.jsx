import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/store';
import { isLoggedIn } from '../authentication';
import Loager from './Loager';

const Login = () => {
  console.log("login..")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/', { replace: true })
    }
  }, [user.user])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };
  if (user.loading) <div>Loading...</div>;
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Logo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
     
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      {user.error && <p className='text-rose-700 text-center'>{user.error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                autoComplete="email"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member? {' '}
          <Link to={'/register'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</Link>
        </p>
      </div>
    </div>
    // <div>
    //   <h2 className="text-3xl font-bold underline">Login</h2>
    //   {user.error !== null && <p>{user.error}</p>}
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       name="username"
    //       value={credentials.username}
    //       onChange={handleChange}
    //       placeholder="Username"
    //     />
    //     <input
    //       type="password"
    //       name="password"
    //       value={credentials.password}
    //       onChange={handleChange}
    //       placeholder="Password"
    //     />
    //     <button type="submit" disabled={user.loading}>
    //       {user.loading ? 'Logging in...' : 'Log In'}
    //     </button>
    //   </form>
    // </div>
  );
};

export default Login;