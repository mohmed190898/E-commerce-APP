import React, { useContext } from 'react'
import style from './Products.module.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { CartContext } from '../../Context/CartContext/CartContext';
import useProducts from '../../Hooks/useProducts';
export default function Products() {
  
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let { addProductToCart } = useContext(CartContext);
  let { data, isLoading, isFetched } = useProducts();
  // console.log(data.data);

  return <>
    <div className="mt-16">
      <div className='text-center'>
        <input className='w-3/4 p-3 my-5 border  rounded-md ' type="text" placeholder='Search...' />
      </div>
    </div>
    {!isLoading ?
      <div className='container flex flex-wrap justify-center gap-5'>
        {isFetched ? data.data.data.map((product) => <div className='md:w-1/5 p-3 product'>
          <div className=''>
            <Link to={`/productlink/${product.id}`}>
              <img className='w-full' src={product.imageCover} alt={product.title} />
              <h2 className='text-main'>{product.category.name}</h2>
              <h2 className='font-medium'>{product.title.split(" ").slice(0, 2).join(' ')}</h2>
              <div className='flex justify-between my-3'>
                <h3>{product.price} EGP</h3>
                <h3><i className='fas fa-star rating-color' ></i> {product.ratingsAverage}</h3>
              </div>
            </Link>
            <div className='text-center'>
              <button onClick={() => addProductToCart(product.id)} className=' btn bg-main w-3/4 text-white rounded py-1 my-3'>+Add</button>
            </div>
          </div>

        </div >) : <h1>not fetched</h1>}
      </div>
      : <Loader />}




  </>
}
