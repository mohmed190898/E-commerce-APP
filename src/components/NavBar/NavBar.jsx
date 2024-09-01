import React, { createContext, useContext } from 'react'
import style from './NavBar.module.css'
import logo from '../../assets/finalProject assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { userContext } from '../../Context/UserContext/UserContext'
import { CartContext } from '../../Context/CartContext/CartContext'


export default function NavBar() {
  let navigate=useNavigate();
  let { myCart  } = useContext(CartContext);
  let { userData , setUserData} = useContext(userContext);
  function logOut(){
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/');
  }
  return <>
    <nav className='bg-gray-100 py-2 fixed w-full z-10'>
      <div className="container flex justify-between py-3">
        <div className=' container flex justify-between'>
          <NavLink to={"/home"}><img src={logo} alt="freshcart-loho" /></NavLink>
          {/* <i>التسوق العربي   </i> */}
          {userData && <ul className='flex space-x-4'>
            <li><NavLink to="home">Home</NavLink></li>
            <li><NavLink to="cart">Cart</NavLink></li>
            <li><NavLink to="wishList">Wish List</NavLink></li>
            <li><NavLink to="products">Products</NavLink></li>
            <li><NavLink to="categories">Categories</NavLink></li>
            <li><NavLink to="brands">Brands</NavLink></li>
          </ul>}
          {userData ? <li className='list-none' onClick={()=> logOut()}><NavLink to="cart"> {myCart? myCart.numOfCartItems : 0} Log out</NavLink></li> :
            <ul className='flex space-x-4'>
              <li><NavLink to="register">Register</NavLink></li>
              <li><NavLink to="">login</NavLink></li>
            </ul>
          }

        </div>


      </div>
    </nav>
  </>
}
