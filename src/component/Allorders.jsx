import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { productContext } from '../context/Products'

function Allorders() { 
  let navigate = useNavigate()
  let {back_URL} = useContext(productContext)
  let [orderData,setOrderData] = useState(null)
  useEffect(()=>{
    let allOrders = async()=>{
      try{
     let response = await axios.get(`${back_URL}/getAllOrders`);
     setOrderData(response.data)
      }catch(error){
        console.log(error);
        
      }
    }
    allOrders()
  },[])

    useEffect(() => {
      const token = localStorage.getItem("email");
      if (token !== "admin@gmail.com") {
        navigate("/login");
      }
    }, []);
  return (
    <>
       <div className="container-fluid">
  <div className="d-flex admin-col">
    <div className="">
      <div className="sidebar">
  <button className="btn sidebar-btn btn-outline-secondary w-100 mb-2">
    <Link to="/admin" className="text-decoration-none" ><span>➕</span> Add Items</Link> 
  </button>
  <button className="btn btn-outline-secondary sidebar-btn w-100 mb-2">
   <Link to="/allitems" className="text-decoration-none" ><span>🗂️</span> List Items</Link> 
  </button>
  <button className="btn active-btn btn-outline-secondary sidebar-btn w-100">
    <Link to="/allorders" className="text-decoration-none" ><span>🧾</span> Orders</Link>
  </button>
</div>
    </div>
    <div className="my-5 w-100">
        <h3 className="text-center">All Orders</h3>
      { orderData ? orderData.map((product, i) => (
  <div className="order-card" key={i}>
    <div className="row">
      <div className="col-md-1 d-flex align-items-start">
        <img src={`${back_URL}/uploads/${product.products[0]?.image}`} alt="product" className="order-img" />
      </div>
      <div className="col-md-6">
        {product.products.map((item, index) => (
          <p className="mb-1 fw-semibold" key={index}>{item.name}</p>
        ))}
        <p className="mb-0 fw-bold">{product.firstName} {product.lastName}</p>
        <p className="text-muted small mb-0">
          {product.address}, {product.city}, {product.state}, {product.country}, {product.zip}
        </p>
      </div>
      <div className="col-md-2">
        <p className="mb-1">Items : {product.products.length}</p>
        <p className="mb-1">Method : COD</p>
        <p className="mb-1">Payment : Pending</p>
        <p className="mb-0">Date : {new Date(product.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="col-md-1 fw-bold d-flex align-items-start justify-content-end">
        ₹{product.products.reduce((sum, p) => sum + (p.price * p.quantity), 0)}
      </div>
      <div className="col-md-2 d-flex align-items-start justify-content-end">
        <select className="form-select form-select-sm w-auto">
          <option>Delivered</option>
          <option>Order Placed</option>
          <option>Shipped</option>
          <option>Cancelled</option>
        </select>
      </div>
    </div>
  </div>
)) : <p>Loading...</p> }

    </div>
  </div>
</div>
    </>
  )
}

export default Allorders