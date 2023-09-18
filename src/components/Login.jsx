import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/store';
import { isLoggedIn } from '../authentication';

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
      navigate('/',{replace:true})
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
  return (
    <div>
      <h2>Login</h2>
      {user.error !== null && <p>{user.error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit" disabled={user.loading}>
          {user.loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default Login;