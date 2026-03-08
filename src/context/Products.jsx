import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const productContext = createContext();

function Products({ children }) {
  const [cart, setCart] = useState(0)
  const [productsItems, setProductsItems] = useState(null);
  let email = localStorage.getItem("email")
  let back_URL = 'https://stylocart-backend-z02r.onrender.com'
  // let back_URL = 'http://localhost:3000'

      const fetchProducts = async () => {
      try {
        const response = await axios.get(`${back_URL}/getproduct`);
        setProductsItems(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    const getCart = async()=>{
       if (email) {
        const res = await axios.get(`${back_URL}/getCart`, { withCredentials: true });
        setCart(res.data.cartItems.length)
       }
    }


  useEffect(() => {
    fetchProducts();
    getCart()
  }, []);
  
  return (
    <productContext.Provider value={{ productsItems, back_URL, cart, getCart }}>
      {children}
    </productContext.Provider>
  );
}

export default Products;
