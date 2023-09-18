import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, fetchUsers } from '../redux/store';
import './userList.css'
import { Link } from 'react-router-dom';
import { adminAllowedOnly } from '../authentication';

const Pagination = ({ index, handleOnClick, active }) => {
  const onClickHandle = (e) => {
    handleOnClick(e.target.value)
  }
  return <button key={index} onClick={onClickHandle} value={index} style={index == active ? { backgroundColor: 'skyblue' } : {}}>{index}</button>;
}

const UserList = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users)
  const [pageIndex, setPageIndex] = useState({
    page: 1,
    limit: 10
  })
  useEffect(() => {
    dispatch(fetchUsers(pageIndex))
    return () => {
    }
  }, [pageIndex]);
  const changePage = (index) => {
    setPageIndex({
      ...pageIndex,
      page: index
    })
  }
  const onDeletehandle = (e) => {
    const response = prompt("Do you want to delete this? please type 'yes'")
    if (response === 'yes')
      dispatch(deleteUser(e.target.value))
  }
  const userData = userList?.users?.data || [];
  let renderList;
  if (userList.loading) {
    renderList = <div>Loading...</div>;
  } else if (userList.error) {
    renderList = <div><strong>{userList.error}</strong></div>;
  } else {
    renderList = userData.length < 1 ? <div><strong>No User Found!!</strong></div> : <div>UserList
      <table style={{ width: "80%", margin: "auto" }}>

        <tbody>
          <tr>
            <th> Name</th>
            <th> Email</th>
            <th> Role</th>
            {!!adminAllowedOnly() && <th colSpan={2}> Action</th>}
          </tr>
          {userData.map(item => {
            return (<tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              {!!adminAllowedOnly() && <td><Link to={'/user/edit/' + item.id} ><button>Edit</button></Link></td>}
              {!!adminAllowedOnly() && <td><button onClick={onDeletehandle} value={item.id}>Delete</button></td>}
            </tr>)
          })}
        </tbody>
      </table>
      <strong>Total: {userList.users?.total} </strong>
      {
        Array.apply(null, Array(Math.ceil(userList.users?.total / pageIndex.limit))).map(function (x, i) { return <Pagination index={i + 1} key={i} handleOnClick={changePage} active={pageIndex.page} />; })}
    </div>
  }
  return renderList
}
export default UserList