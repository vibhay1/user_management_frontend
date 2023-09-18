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
    <div>
      EditUser
      {userState.message !== null && <p>{userState.message}</p>}
      {userState.error !== null && <p>{userState.error}</p>}
      <form onSubmit={handleSubmit(submitForm)}>
        <div className='form-group' key={'name'}>
          <label htmlFor='name'>Name</label>
          <input type='text' className='form-input' {...register('name')} required />
        </div>
        <div className='form-group' key={'email'}>
          <label htmlFor='email'>Name</label>
          <input type='email' className='form-input' {...register('email')} required disabled />
        </div>
        <div className='form-group' key={'role'}>
          <label htmlFor='role'>Role</label>
          <select name="role" id="role" {...register('role')}  >
            <option value={'user'} >User</option>
            <option value={'admin'} >Admin</option>
          </select>
        </div>
        <button type='submit' className='button'> Add User</button>
      </form>
    </div>
  )
}

export default EditUser