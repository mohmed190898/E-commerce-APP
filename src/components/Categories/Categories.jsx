import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
export default function Categories() {

  const [categories, setCategories] = useState()
  function getSpecificCategory(catID) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${catID}/subcategories`);
  }
  let {data} = useQuery({
    queryKey: ['categories'],
    queryFn: getSpecificCategory,
  });
  console.log(data);

  async function getCategries() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(data.data);
      console.log(data);

    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    getCategries();
  }, [])

  return <>
    {categories ?
      <div className="flex flex-wrap justify-center mt-16">
        {categories?.map((categ) =>
          <div  onClick={() => getSpecificCategory(categ._id)} className='cursor-pointer md:w-1/4 product border  text-center m-3'>
            <img src={categ.image} alt="" className='h-[400px] w-fit' />
            <h2 className='text-3xl'>{categ.name}</h2>
          </div>
        )}
      </div> :
      <div className='flex justify-center text-center mt-8'>
        <Loader />
      </div>}
    <h1> {data}</h1>
  </>
}
