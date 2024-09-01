import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import Slider from 'react-slick';
import axios from 'axios';

export default function CategoriesSlider({ categroiesData }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplayspeed: 2000,
  };
  const [category, setCategory] = useState([])
  async function getCategory() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      setCategory(data.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getCategory();
  }, [])

  return <>
      <Slider {...settings} className='my-10'>
        {category?.map((category) => <div className=''>
          <img className='w-full h-[250px]' src={category.image} alt="" />
          <h2 className='text-black  text-3xl my-2'>{category.name}</h2>
        </div>)}
      </Slider>
  </>
}



// const [category, setCategeryData] = useState([categroiesData])
//   useEffect(() => {
//     setCategeryData(categroiesData);
//     console.log(category);
//     return()=>{
//       <h1>{category}</h1>
//     }
//   }, []);
