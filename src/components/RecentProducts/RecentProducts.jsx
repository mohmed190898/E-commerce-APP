import React, { useContext, useState } from 'react'
import style from './RecentProducts.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext/CartContext';
export default function RecentProducts({ productProp, index }) {

  let { addProductToCart ,addProductToWishList} = useContext(CartContext);
  const [color, setColor] = useState(false)
  function changeColor(){
    setColor(true);
  }
  return <>

    <div className='md:w-1/5 p-3 product'>
      <div className=''>
        <Link to={`/productlink/${productProp.id}`}>
          <img className='w-full' src={productProp.imageCover} alt={productProp.title} />
          <h2 className='text-main'>{productProp.category.name}</h2>
          <h2 className='font-medium'>{productProp.title.split(" ").slice(0, 2).join(' ')}</h2>
          <div className='flex justify-between my-3'>
            <h3>{productProp.price} EGP</h3>
            <h3><i className='fas fa-star rating-color' ></i> {productProp.ratingsAverage}</h3>
          </div>


        </Link>
        <span onClick={()=> addProductToWishList(productProp.id)} className="flex justify-end  w-fit " >
          {color ? <i onMouseDown={changeColor} className="text-red-600 text-2xl fa-solid fa-heart " ></i> :<i onMouseDown={changeColor} className="changeHeartColor text-2xl fa-solid fa-heart " ></i>}
        </span>
        <div className='text-center'>
          <button onClick={() => addProductToCart(productProp.id)} className=' btn bg-main w-3/4 text-white rounded py-1 my-3'>+Add</button>
        </div>
      </div>

    </div >


  </>
}
