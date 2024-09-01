import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import { useNavigate } from 'react-router-dom';
export let userContext = createContext();
export default function UserContextProvider({ children }) {
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            setUserData(localStorage.getItem('userToken'));
        }
    }, [])
    return <userContext.Provider value={{ userData, setUserData }}>
        {children}
    </userContext.Provider>
}
