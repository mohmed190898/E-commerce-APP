import React, { useContext, useEffect } from 'react'
import style from './Allorders.module.css'
import { CartContext } from '../../Context/CartContext/CartContext';
export default function Allorders() {
  let {clearCart} = useContext(CartContext);
  useEffect(() => {
    clearCart();
  }, [])
  
  return <>

    <h1 className='mt-16'>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa allorders</h1>
  </>
}
