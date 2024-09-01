import React, { useContext, useEffect } from 'react'
import style from './LayOut.module.css'
import NavBar from '../NavBar/NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { userContext } from '../../Context/UserContext/UserContext';
export default function LayOut() {
  
  let {setUserData} = useContext(userContext);
    
  return <>
    <NavBar />
    <div className='container py-14 '>
      <Outlet/>
    </div>
  </>
}
