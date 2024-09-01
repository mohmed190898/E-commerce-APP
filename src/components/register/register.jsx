import React, { createContext, useContext, useState } from 'react'
import style from './Register.module.css'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../Context/UserContext/UserContext'


export default function Register() {

  const [apiError, setError] = useState(null)
  let navigate = useNavigate();
  let {userData , setUserData} = useContext(userContext);

  async function handleRegister(values) {
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      localStorage.setItem('userToken', data.token);
      navigate("/")
      setUserData(data.token);
      console.log(data.token);
      setError(null);
      
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  }
  // function handleValidate(values) {
  //   let errors = {};
  //   if (values.name == "")
  //     errors.name = "name is required"
  //   if (values.email == "")
  //     errors.email = "email is required"
  //   if (values.password == "")
  //     errors.password = "password is required"
  //   if (values.name == "")
  //     errors.rePassword = "rePassword is required"
  //   if (values.phone == "")
  //     errors.phone = "phone is required"
  //   return errors;
  // }
  let yupValidate = yup.object().shape({
    name: yup.string().min(3, "name min length is 3").required('name is required'),
    email: yup.string().email('pattern is invalid').required('email is required'),
    password: yup.string().matches(/^[a-zA-Z]\w{6,9}$/, 'must be Start with a letter (either uppercase or lowercase).* Be between 6 and 9 characters in total.* Can only contain letters (A-Z or a-z) and numbers (0-9)').required('password is required'),
    rePassword: yup.string().oneOf([yup.ref('password')], "re-Password isn't match").required("rePassword is required"),
    phone: yup.string().matches(/^(01[0125][0-9]{8})$/, "invalid Phone").required("phone is required"),

  });

  let formik = useFormik({
    initialValues: {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: '',
    }, validationSchema: yupValidate,
    onSubmit: handleRegister
  })

  return <>
    <div className=''>
      <h2 className='font-semibold text-3xl my-2'>Register Now</h2>
      <form onSubmit={formik.handleSubmit} className='mx-auto'>

        {apiError && <div className="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apiError}
        </div>}
        {/* NAME */}
        <div className='my-3'>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
          <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        {formik.errors.name && formik.touched.name && <div className="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.name}
        </div>}
        {/* EMAIL */}
        <div className='my-3'>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Email:</label>
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
        {/* REPASSWORD */}
        <div className='my-3'>
          <label htmlFor="re-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re-password:</label>
          <input type="password" name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && <div className="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.rePassword}
        </div>}
        {/* PHONE */}
        <div className='my-3'>
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone:</label>
          <input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        {formik.errors.phone && formik.touched.phone && <div className="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.phone}
        </div>}
        <button type="submit" className="ms-auto block text-gray-300 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register Now</button>
      </form>
    </div>
  </>
}
