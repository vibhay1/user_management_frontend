import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { fetchUser, updateUser } from '../redux/store';

const EditUser = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUser(param.id))
  }, []);
  useEffect(() => {
    if (userState.lastAction === 'updateUser') {
      navigate('/', { replace: true });
    }
    reset(
      {
        name: userState.users.name,
        email: userState.users.email,
        role: userState.users.role,
      }
    )
  }, [userState]);
  const submitForm = (data) => {
    data.id = userState.users.id;
    dispatch(updateUser(data))
  }
  if (userState.loading === true) return <div>Loading...</div>
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className='flex w-full justify-end'>
          <button
            className="rounded-md bg-rose-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200"
            onClick={() => navigate('/', { replace: true })}
          >
            Back
          </button>
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Edit user details
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {userState.message !== null && <p className='text-emerald-700 text-center'>{userState.message}</p>}
        {userState.error !== null && <p className='text-rose-700 text-center'>{userState.error}</p>}
        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
          <div key={'name'}>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                type="name"
                {...register('name')}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div key={'email'}>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                {...register('email')}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div key={'role'}>
            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
              Role
            </label>
            <div className="mt-2">
              <select name="role" id="role" {...register('role')} required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option value={'user'} >User</option>
                <option value={'admin'} >Admin</option>
              </select>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div >
    // <div>
    //   EditUser
    //   {userState.message !== null && <p>{userState.message}</p>}
    //   {userState.error !== null && <p>{userState.error}</p>}
    //   <form onSubmit={handleSubmit(submitForm)}>
    //     <div className='form-group' key={'name'}>
    //       <label htmlFor='name'>Name</label>
    //       <input type='text' className='form-input' {...register('name')} required />
    //     </div>
    //     <div className='form-group' key={'email'}>
    //       <label htmlFor='email'>Name</label>
    //       <input type='email' className='form-input' {...register('email')} required disabled />
    //     </div>
    //     <div className='form-group' key={'role'}>
    //       <label htmlFor='role'>Role</label>
    //       <select name="role" id="role" {...register('role')}  >
    //         <option value={'user'} >User</option>
    //         <option value={'admin'} >Admin</option>
    //       </select>
    //     </div>
    //     <button type='submit' className='button'> Add User</button>
    //   </form>
    // </div>
  )
}

export default EditUser