import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios'
import Products from '../Products/Products';
import RecentProducts from '../RecentProducts/RecentProducts';
import Loader from '../Loader/Loader';
import Slider from 'react-slick';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';
import useProducts from '../../Hooks/useProducts';

export default function Home() {
  const [products, setProducts] = useState([]);
  // let response = useProducts();
  async function GetProducts() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      setProducts(data.data);

    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    GetProducts();
  }, [])

  return <>
    <MainSlider></MainSlider>
    <CategoriesSlider categroiesData={products}></CategoriesSlider>
    <div className='text-center'>
      <input className='w-3/4 p-3 my-5 border  rounded-md ' type="text" placeholder='Search...' />
    </div>

    {/* <div className='flex flex-wrap justify-center'>
      <Slider {...settings} className='w-1/4'>
        {products.images?.map((img) => <img src={img} alt="" />)}
      </Slider>

      <div className='w-1/12'>
        <div className='flex flex-wrap'>
          <img className='w-full' src={products.imageCover} alt="" />
          <img className='w-full' src={products.imageCover} alt="" />
        </div>
        <img src="" alt="" />
      </div>
    </div> */}
    {products.length ? <div className=' container flex flex-wrap justify-center gap-5'>
      {products.map((product, index) => <RecentProducts key={index} productProp={product} />)}
    </div> : <div className='flex justify-center text-center mt-8'>
      <Loader />
    </div>}

  </>
}
