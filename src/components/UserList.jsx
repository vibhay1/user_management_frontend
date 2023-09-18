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

  return <button className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white ${active == index ? 'bg-slate-300' : ''}`} key={index} onClick={onClickHandle} value={index} > {index}</ button>
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
  const totalPage = Math.ceil(userList.users?.total / pageIndex.limit);
  if (userList.loading) {
    renderList = <div>Loading...</div>;
  } else if (userList.error) {
    renderList = <div><strong>{userList.error}</strong></div>;
  } else {
    renderList = userData.length < 1 ? <p className='text-rose-700 text-center'>No user found</p> :
      <div className="flex flex-col container mx-auto px-4">
        <h6 className=" mt-2 text-center text-lg font-bold leading-9 tracking-tight text-gray-900">
          User List
        </h6>
        {userList.error !== null && <p className='text-rose-700 text-center'>{userList.error}</p>}
        {(userList.lastAction === 'delete' && userList.message === 'success') && <p className='text-emerald-700 text-center'>User has been deleted successfully</p>}
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">

          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead
                  className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                  <tr>
                    <th scope="col" className="px-6 py-4">Name</th>
                    <th scope="col" className="px-6 py-4">Email</th>
                    <th scope="col" className="px-6 py-4">Role</th>
                    {!!adminAllowedOnly() && <th colSpan={2} scope="col" className="px-6 py-4"> Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {userData.map((item, index) => {
                    return (<tr
                      className={`border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600`} key={item.id} >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{item.name}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.role}</td>
                      {!!adminAllowedOnly() && <td className="whitespace-nowrap px-6 py-4"><Link to={'/user/edit/' + item.id} ><button><svg className="fill-emerald-700" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                        viewBox="0 0 50 50">
                        <path
                          d="M 46.574219 3.425781 C 45.625 2.476563 44.378906 2 43.132813 2 C 41.886719 2 40.640625 2.476563 39.691406 3.425781 C 39.691406 3.425781 39.621094 3.492188 39.53125 3.585938 C 39.523438 3.59375 39.511719 3.597656 39.503906 3.605469 L 4.300781 38.804688 C 4.179688 38.929688 4.089844 39.082031 4.042969 39.253906 L 2.035156 46.742188 C 1.941406 47.085938 2.039063 47.453125 2.292969 47.707031 C 2.484375 47.898438 2.738281 48 3 48 C 3.085938 48 3.171875 47.988281 3.257813 47.964844 L 10.746094 45.957031 C 10.917969 45.910156 11.070313 45.820313 11.195313 45.695313 L 46.394531 10.5 C 46.40625 10.488281 46.410156 10.472656 46.417969 10.460938 C 46.507813 10.371094 46.570313 10.308594 46.570313 10.308594 C 48.476563 8.40625 48.476563 5.324219 46.574219 3.425781 Z M 45.160156 4.839844 C 46.277344 5.957031 46.277344 7.777344 45.160156 8.894531 C 44.828125 9.222656 44.546875 9.507813 44.304688 9.75 L 40.25 5.695313 C 40.710938 5.234375 41.105469 4.839844 41.105469 4.839844 C 41.644531 4.296875 42.367188 4 43.132813 4 C 43.898438 4 44.617188 4.300781 45.160156 4.839844 Z M 5.605469 41.152344 L 8.847656 44.394531 L 4.414063 45.585938 Z">
                        </path>
                      </svg></button></Link></td>}
                      {!!adminAllowedOnly() && <td className='whitespace-nowrap px-6 py-4'> <button onClick={onDeletehandle} value={item.id} className=' text-rose-500'> Delete</button></td>}
                    </tr>)
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <strong>Total: {userList.users?.total} </strong>
        <nav aria-label="Page navigation example">
          <ul className="list-style-none flex justify-end">
            <li>
              <button
                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white " disabled={pageIndex.page > 1 ? false : true}
                value={Number(pageIndex.page) - 1}
                onClick={(e) => changePage(e.target.value)}
              >Previous</button>
            </li>
            {

              Array.apply(null, Array(totalPage)).map(function (x, i) { return <Pagination index={i + 1} key={i} handleOnClick={changePage} active={pageIndex.page} />; })
            }
            <li>
              <button
                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white " disabled={totalPage > pageIndex.page ? false : true}
                value={Number(pageIndex.page) + 1}
                onClick={(e) => changePage(e.target.value)}
              >Next</button>
            </li>
          </ul>
        </nav>


      </div >;
  }
  return renderList
}
export default UserList