import React, { useContext, useEffect, useState } from 'react'
import style from './ProductsDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick'
import Loader from '../Loader/Loader'
import { CartContext } from '../../Context/CartContext/CartContext'

export default function ProductsDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplayspeed: 3000,
  };
  const [productsDetails, setProductsDetails] = useState([])
  let {addProductToCart}=useContext(CartContext);
  let { id } = useParams()
  async function getProductDetails(id) {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      // console.log(data);
      setProductsDetails(data.data);
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    getProductDetails(id)
  }, [])

  return <>
    <div className="container mt-16">
      <div className='flex justify-between gap-4 al'>
        <div className="w-1/3">
        {productsDetails.images >1 ? <Slider {...settings}>
            {productsDetails.images?.map((img) => <img src={img} key={id} alt="" />)}
          </Slider> : <img src={productsDetails.imageCover}  alt="" /> }
          
        </div>

        <div className='w-2/3 my-auto'>
          <div className=''>
            <h2 className='text-3xl my-3'>{productsDetails.title}</h2>
            <p className='text-gray-500'>{productsDetails.description}</p>
            <div className='flex justify-between my-3' >
              <h3>{productsDetails.price}EGP</h3>
              <h3><i className='fas fa-star rating-color'>{productsDetails.ratingsAverage}</i></h3>
            </div>
          </div>
          <div className='text-center'>
            <button onClick={()=> addProductToCart(id)} className='w-3/4  btn bg-main text-white rounded py-2' type="button">+Add</button>
          </div>
        </div>
      </div>
      {/* <h1> RElated </h1> */}

      {/* <div className="flex flex-wrap" >
        <div className="w-1/5">
          <img className='w-full' src={productsDetails.imageCover} alt={productsDetails.title} />
          <h2 className='text-main'>{productsDetails.category.name}</h2>
          <h2 className='font-medium'>{productsDetails.title.split(" ").slice(0, 2).join(' ')}</h2>
          <div className='flex justify-between my-3'>
            <h3>{productsDetails.price} EGP</h3>
            <h3><i className='fas fa-star rating-color' ></i> {productsDetails.ratingsAverage}</h3>
          </div>
        </div>
      </div> */}
    </div>



  </>
}
