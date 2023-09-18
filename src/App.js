import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import DashboardLayout from './layout/DashboardLayout';
import UserList from './components/UserList';
import PrivateRoute from './helper/PrivateRoute';
import { isLoggedIn } from './authentication';
import AdminRoute from './helper/AdminRoute';
import EditUser from './components/EditUser';
import AddUser from './components/AddUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>} >
          <Route index={true}  element={<PrivateRoute><UserList /></PrivateRoute>} />
          <Route path="/user/edit/:id?" element={<AdminRoute redirectPath='/'><EditUser /></AdminRoute>} />
          <Route path="/user/add" element={<AdminRoute redirectPath='/'>< AddUser /></AdminRoute>} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
