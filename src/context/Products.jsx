import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const productContext = createContext();

function Products({ children }) {

  const [cart, setCart] = useState(0)
  const [productsItems, setProductsItems] = useState(null)

  const back_URL = 'https://stylocart-backend-z02r.onrender.com'
  // const back_URL = 'http://localhost:3000'

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${back_URL}/getproduct`);
      setProductsItems(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const getCart = async () => {
    try {
      const email = localStorage.getItem("email");

      if (email) {
        const res = await axios.get(`${back_URL}/getCart`, { withCredentials: true });
        setCart(res.data.cartItems.length);
      } else {
        setCart(0);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {

    const init = async () => {

      const params = new URLSearchParams(window.location.search);
      const email = params.get("email");

      if (email) {
        localStorage.setItem("email", email);
        window.history.replaceState({}, document.title, "/");
      }

      await fetchProducts();
      await getCart();
    };

    init();

  }, []);

  return (
    <productContext.Provider value={{ productsItems, back_URL, cart, getCart }}>
      {children}
    </productContext.Provider>
  );
}

export default Products;