import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const productContext = createContext();

function Products({ children }) {

  const [cart, setCart] = useState(0)
  const [productsItems, setProductsItems] = useState(null)

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

  const getCart = async () => {
    const email = localStorage.getItem("email");

    if (email) {
      const res = await axios.get(`${back_URL}/getCart`, { withCredentials: true });
      setCart(res.data.cartItems.length);
    }
  };

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  if (email) {
    localStorage.setItem("email", email);

    // remove email from URL
    window.history.replaceState({}, document.title, "/");
  }

  fetchProducts();
  getCart();
}, []);

  return (
    <productContext.Provider value={{ productsItems, back_URL, cart, getCart }}>
      {children}
    </productContext.Provider>
  );
}

export default Products;