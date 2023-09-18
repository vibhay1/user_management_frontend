import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { addUserFields } from '../constants/formFields';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/store';
const renderFormField = (register) => addUserFields.map(field => {
  return <div className='form-group' key={field.id}>
    <label htmlFor={field.labelFor}>{field.labelText}</label>
    <input type={field.type} className='form-input' {...register(field.name)} required />
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
  },[userState])
  const submitForm = (data) => {
    dispatch(addUser(data));
  }
  console.log(userState)
  if (userState.loading === true) return <div>Loading...</div>
  if (userState.message) {
    return <div>{userState.message}</div>
  }
  return (
    <div>Add user
      {userState.error !== null && <p>{userState.error}</p>}
      <form onSubmit={handleSubmit(submitForm)}>
        {renderFormField(register)}
        <div className='form-group' key='role'>
          <label htmlFor='role'>Role</label>
          <select name="role" id="role" {...register('role')} >
            <option value={'user'}>User</option>
            <option value={'admin'}>Admin</option>
          </select>
        </div>
        <button type='submit' className='button'> Add User</button>
      </form>
    </div>
  )
}

export default AddUser