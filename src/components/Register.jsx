import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { signupFields } from '../constants/formFields';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/store';


const renderFormField = (register) => signupFields.map(field => {
    return <div className='form-group' key={field.id}>
        <label htmlFor={field.labelFor}>{field.labelText}</label>
        <input type={field.type} className='form-input' {...register(field.name)} required />
    </div>
})

const Register = () => {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const registerState = useSelector(state => state.register);
    useEffect(() => {
        alert("Successfully Register");
        reset();
    }, [registerState])
    const submitForm = (data) => {
        if (data.password !== data.confirmPassword) {
            alert("Password and confirm password not matched")
        }
        dispatch(registerUser(data))
    }
    if (registerState.loading === true) return <div>Loading...</div>
    return (
        <div>Register
            {registerState.error !== null && <p>{registerState.error}</p>}
            <form onSubmit={handleSubmit(submitForm)}>
                {renderFormField(register)}
                <button type='submit' className='button'> Register</button>
            </form>
        </div>
    )
}

export default Register