import React, { useContext, useEffect } from 'react'
import style from './WishList.module.css'
import { CartContext } from '../../Context/CartContext/CartContext';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
export default function WishList() {

  let {getWishList,Loading,myWishList ,deleteFromWishList,addProductToCart} = useContext(CartContext);
  function addAndDelete(productId){
    addProductToCart(productId);
    deleteFromWishList(productId);
  }
  useEffect(() => {
    getWishList();
    console.log(myWishList);
    
  }, [])


  return <>
    {!myWishList ? <Loader /> : <div className='bg-gray-100 rounded p-10 bg-light mt-16'>

      <div className='flex justify-between '>
        <h2 className='text-3xl '>My Wish List</h2>
      </div>

      {Loading ? <Loader /> : myWishList.data?.map((product) =>
        <div className='flex justify-between my-5'>
          <div className='flex'>
            <img src={product.imageCover} alt="image" className=' h-[200px] w-fit' />
            <div className='ms-4 my-auto '>
              <h2 className=''>{product.title}title</h2>
              <p className='font-semibold  text-xl font-mono my-2'>{product.price}<span className='ms-2 font-semibold font-mono *:'>EGP</span></p>
              <span onClick={() => deleteFromWishList(product.id)} className=' text-red-600 cursor-pointer flex'><i className="me-2 fa fa-delete w-1/12 "></i> Remove</span>
            </div>
          </div>
          <div className=' my-auto w-1/4'>
            <button onClick={() => addAndDelete(product.id)  } className=' btn bg-main  text-white rounded py-1 w-full'>+Add</button>
          </div>

        </div>
      )}

    </div>
    }
  </>


}
