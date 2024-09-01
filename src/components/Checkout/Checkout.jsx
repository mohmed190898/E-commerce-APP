import React, { createContext, useContext, useState } from 'react'
import style from './Checkout.module.css'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { CartContext } from '../../Context/CartContext/CartContext'

export default function Checkout() {
  let {checkOut} = useContext(CartContext);
  let formik = useFormik({
    initialValues: {
      details: '',
      city: '',
      phone: '',
    }, onSubmit: checkOut
  })

  return <>
    <div className='mt-16'>
      <h2 className='text-2xl font-semibold underline'>Check Now</h2>
      <form onSubmit={formik.handleSubmit} className='mx-auto'>
        {/* details */}
        <div className='my-3'>
          <label htmlFor="details" className="text-xl font-semibold block mb-2  text-gray-900 dark:text-white">Details:</label>
          <input type="details" name="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>

        {/* phone */}
        <div className='my-3'>
          <label htmlFor="phone" className="text-xl font-semibold block mb-2   text-gray-900 dark:text-white">Phone:</label>
          <input type="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        <div className='my-3'>
          <label htmlFor="city" className="text-xl font-semibold block mb-2  text-gray-900 dark:text-white">City:</label>
          <input type="text" name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        <button  type="submit" className=" text-gray-300  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pay now</button>
      </form>
    </div>
  </>
}
