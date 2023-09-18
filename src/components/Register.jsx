import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { signupFields } from '../constants/formFields';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/store';
import { Link } from 'react-router-dom';


const renderFormField = (register) => signupFields.map(field => {
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

const Register = () => {
    const { register, handleSubmit, reset } = useForm();
    const [passwordMatch, setPasswordmatch] = useState(true);
    const dispatch = useDispatch();
    const registerState = useSelector(state => state.register);
    useEffect(() => {
        reset();
    }, [registerState])
    const submitForm = (data) => {
        if (data.password !== data.confirmPassword) {
            setPasswordmatch(false);
        } else {
            setPasswordmatch(true);
            dispatch(registerUser(data))
        }
    }
    if (registerState.loading === true) return <div>Loading...</div>
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Logo"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Register your account here
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {registerState.error && <p className='text-rose-700 text-center'>{registerState.error}</p>}
                {!passwordMatch && <p className='text-rose-700 text-center'>Confirm password not matched</p>}
                <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
                    {renderFormField(register)}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member? {' '}
                    <Link to={'/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in</Link>
                </p>
            </div>
        </div>


        // <div>Register
        //     {registerState.error !== null && <p>{registerState.error}</p>}
        //     <form onSubmit={handleSubmit(submitForm)}>
        //         {renderFormField(register)}
        //         <button type='submit' className='button'> Register</button>
        //     </form>
        // </div>
    )
}

export default Register