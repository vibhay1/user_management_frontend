import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { addUserFields } from '../constants/formFields';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/store';
const renderFormField = (register) => addUserFields.map(field => {
  return <div key={field.id}>
    <div className="flex items-center justify-between">
      <label htmlFor={field.labelFor} className="block text-sm font-medium leading-6 text-gray-900">
        {field.labelText}
      </label>
    </div>
    <div className="mt-2">
      <input
        id={field.name}
        type={field.type}
        name={field.name}
        {...register(field.name)}
        required
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>
})
const AddUser = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.users);
  const navigate = useNavigate();
  useEffect(() => {
    if (userState.lastAction === 'add') {
      navigate('/', { replace: true });
    }
  }, [userState])
  const submitForm = (data) => {
    dispatch(addUser(data));
  }
  console.log(userState)
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
          Add new user
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {userState.error && <p className='text-rose-700 text-center'>{userState.error}</p>}
        {userState.message && <p className='text-emerald-700 text-center'>{userState.message}</p>}
        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
          {renderFormField(register)}
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUser