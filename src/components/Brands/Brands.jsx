import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios';
import Loader from '../Loader/Loader';
export default function Brands() {

  const [brands, setBrands] = useState()

  async function getBrands() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      setBrands(data.data);
      console.log(data.data);

    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    getBrands();
  }, [])
  function displayBrandData(){
    alert("");
    
  }
  return <>
  
  {brands ?
      <div className="flex flex-wrap justify-center mt-16">
        {brands?.map((brand) =>
          <div onClick={displayBrandData} className=' md:w-1/5 product border  text-center m-3'>
            <img src={brand.image} alt="" className='h-[200px] w-fit' />
            <h2 className='text-3xl mb-4'>{brand.name}</h2>
          </div>
        )}
      </div> :
      <div className='flex justify-center text-center mt-8'>
        <Loader />
      </div>}
      {/* <div className=''>
        <div className="flex justify-between">
          <h2 className='bg-green-600'>{brands[0]?.name}</h2>
          <h2></h2>
        </div>
      </div> */}
  </>
}
