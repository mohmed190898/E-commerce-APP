import React, { createContext, useContext, useState } from 'react'
import style from './Login.module.css'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../Context/UserContext/UserContext'


export default function Login() {
  let navigate = useNavigate();
  const [apiError, setApiError] = useState(null)
  let { setUserData } = useContext(userContext);

  async function handleLogin(values) {
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
      localStorage.setItem('userToken', data.token);
      navigate('/home');
      setUserData(data.token);
      
      setApiError(null);      
    } catch (error) {
      console.log(error.response.data.message);
      setApiError(error.response.data.message);
    }
  }

  let yupValidate = yup.object().shape({
    email: yup.string().email('pattern is invalid').required('email is required'),
    password: yup.string().matches(/^[a-zA-Z]\w{6,9}$/, 'must be Start with a letter (either uppercase or lowercase).* Be between 6 and 9 characters in total.* Can only contain letters (A-Z or a-z) and numbers (0-9)').required('password is required'),

  })
  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yupValidate,
    onSubmit: handleLogin
  })

  return <>

    <div className='mt-16'>
      <h1 className='font-bold text-3xl my-2'>Login Now</h1>
      <form onSubmit={formik.handleSubmit} className='mx-auto'>
        {apiError && <div className="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apiError}
        </div>}
        {/* EMAIL */}
        <div className='my-3'>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
          <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        {formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.email}
        </div>}
        {/* PASSWORD */}
        <div className='my-3'>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
          <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
          {formik.errors.password && formik.touched.password && <div className="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}
          </div>}
        </div>

        <span className='text-black font-bold cursor-pointer hover:text-green-600'>forget your password ?</span>
        <button type="submit" className="ms-auto block text-gray-300 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login Now</button>
      </form>
    </div>
  </>
}
