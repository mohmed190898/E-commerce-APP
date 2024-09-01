import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext/CartContext';
import Logo from '../../assets/finalProject assets/images/blog-img-1.jpeg';
import Loader from '../Loader/Loader';
import reactDom from 'react-dom'
import { Link } from 'react-router-dom';

export default function Cart() {
  let { getCart, myCart, UpdateProductCount ,deleteCart , Loading  ,clearCart} = useContext(CartContext);

  useEffect(() => {
    getCart();
  }, [])

  return <>
    {!myCart ? <Loader /> : <div className='bg-gray-100 rounded p-10 bg-light mt-16'>

      <div className='flex justify-between '>
        <h2 className='text-3xl '>Cart Shop</h2>
        <Link to={'/checkout'} className='btn bg-green-500 p-4 rounded-xl mb-3 text-white font-bold font-sans'>Check out</Link>
      </div>
      <div className='flex justify-between'>
        <p className='text-xl'>Total Price: <span className='text-green-600'>{myCart.data ? myCart.data?.totalCartPrice : 0}</span> </p>
        <p className='text-xl'>Total Number of Items: <span className='text-green-600 font-bold'>{myCart.data ? myCart.numOfCartItems : 0}</span>  </p>
      </div>

      {Loading? <Loader/> :  myCart.data?.products.map((product) =>
        <div className='flex justify-between my-5'>
          <div className='flex'>
            <img src={product.product.imageCover} alt="image" className=' h-[200px] w-fit' />
            <div className='ms-4 my-auto '>
              <h2 className=''>{product.product.title }title</h2>
              <p className='font-semibold  text-xl font-mono my-2'>{product.price}<span className='ms-2 font-semibold font-mono *:'>EGP</span></p>
              <span onClick={()=>deleteCart(product.product.id)} className=' text-red-600 cursor-pointer flex'><i className="me-2 fa fa-delete w-1/12 "></i> Remove</span>
            </div>
            
          </div>
          <div className='mx-4 my-auto'>
            <span onClick={() => UpdateProductCount(product.product.id, product.count+1)} className='cursor-pointer rounded border  border-green-400 p-3  text-xl'>+</span>
            <span className=' p-3 mx-4'>{product.count}</span>
            <span onClick={() => UpdateProductCount(product.product.id, product.count-1)} className='cursor-pointer rounded border border-red-400 p-3 text-red-400 font-bold text-xl'>-</span>
          </div>
        
        </div>
      )}
      <button onClick={()=> clearCart()} className=' w-1/3 p-2 border border-green-400  rounded'>Clear you cart</button>

    </div>
    }
  </>
} 
