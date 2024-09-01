import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayOut from './components/LayOut/LayOut'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Register from './components/register/register'
import * as React from 'react'
import NavBar from './components/NavBar/NavBar'
import NotFound from './components/NotFound/NotFound'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import Categories from './components/Categories/Categories'
import Products from './components/Products/Products'
import WishList from './components/WishList/WishList'
import UserContextProvider from './Context/UserContext/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductsDetails from './components/ProductsDetails/ProductsDetails'
import CartContextProvider from './Context/CartContext/CartContext'
import { Toaster } from 'react-hot-toast'
import Checkout from './components/Checkout/Checkout'
import Allorders from './components/Allorders/Allorders'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

let routers = createBrowserRouter([
  {
    path: '', element: <LayOut />, children: [
      { index: true, element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /> </ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'productlink/:id', element: <ProtectedRoute><ProductsDetails /></ProtectedRoute> },
      { path: 'wishList', element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Allorders /></ProtectedRoute> },
      { path: '*', element: <NotFound /> },
    ]
  }
])
let query = new QueryClient();
export default function App() {
  const [count, setCount] = useState(0)

  return <>
    <QueryClientProvider client={query}>
      <CartContextProvider>
        <UserContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <ReactQueryDevtools/>
          <Toaster />
        </UserContextProvider>
      </CartContextProvider>
    </QueryClientProvider>


  </>
}


