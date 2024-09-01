import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { createContext, useContext } from 'react'
export let categoriesContext = createContext();
export default function CategoriesContextProvider() {
    function getSpecificCategory(catID) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${catID}/subcategories`);
    }
    let { data } = useQuery({
        queryKey: ['categories'],
        queryFn: getSpecificCategory,
    });
    return <createContext.provider value={{getSpecificCategory , data}}>
        {children}
    </createContext.provider>
}
