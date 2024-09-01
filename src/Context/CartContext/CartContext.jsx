import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();
export default function CartContextProvider({ children }) {

    let headers = {
        token: localStorage.getItem('userToken')
    }
    const [Loading, setLoading] = useState(false)
    const [myCart, setMyCart] = useState(null)
    const [myWishList, setMyWishList] = useState(null)

    async function checkOut(shippingAddress) {
        try {
            setLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${myCart.data._id}?url=http://localhost:5179`, {
                shippingAddress
            }, {
                headers
            });
            console.log(data);
            setLoading(false);
            window.location.href = data.session.url;


        } catch (err) {
            console.log(err.message);
        }
    }
    async function addProductToWishList(productId) {
        try {
            setLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                productId
            }, {
                headers
            });
            toast.success(data.message, {
                duration: 2000,
                position: "top-right",
            });

            setMyWishList(data);
            setLoading(false);

        } catch (err) {
            console.log(err.message);
        }
    }
    async function addProductToCart(productId) {
        try {
            setLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
                productId
            }, {
                headers
            });
            toast.success(data.message, {
                duration: 2000,
                position: "top-right",
            });

            setMyCart(data);
            setLoading(false);

        } catch (err) {
            console.log(err.message);
        }
    }

    async function getWishList() {
        try {
            setLoading(true);
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                headers
            });
            setMyWishList(data);
            setLoading(false);

        } catch (err) {
            console.log(err.message);
        }
    }
    async function getCart() {
        try {
            setLoading(true);
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers
            });
            setMyCart(data);
            setLoading(false);

        } catch (err) {
            console.log(err.message);
        }
    }

    async function UpdateProductCount(productId, count) {
        try {
            setLoading(true);
            let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                count,
            }, {
                headers,
            });
            console.log("update");
            setMyCart(data);
            setLoading(false);

        } catch (err) {
            console.log(err.message);
        }
    }
    async function deleteFromWishList(productId) {
        try {
            setLoading(true);
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
                headers
            });
            setMyWishList(data);
            setLoading(false);

        } catch (err) {
            console.log(err.message);
        }
    }
    async function deleteCart(productId) {
        try {
            setLoading(true);
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                headers
            });
            setMyCart(data);
            setLoading(false);

        } catch (err) {
            console.log(err.message);
        }
    }
    async function clearCart() {
        try {
            setLoading(true);
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers
            });

            setMyCart(null);
            setLoading(false);

        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        getCart();
    }, [])

    return <CartContext.Provider value={{deleteFromWishList,getWishList, UpdateProductCount, addProductToCart, getCart, myCart, setMyCart, deleteCart, checkOut, Loading, clearCart ,addProductToWishList,myWishList,setMyWishList}}>
        {children}
    </CartContext.Provider>
}