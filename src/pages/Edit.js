import React from 'react'
import { useState, useEffect } from 'react';
import './pages.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  const [input, setinput] = useState({
    title: "",
    description: "",
    photo: "",
    price: "",
    stockQuantity: "",
    rating: "",
    category: "",
    owner: "",
    productBrand: "",
    productType: ""

  })
  
  const { id } = useParams();

  const navigate =useNavigate()
  const inputHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setinput({ ...input, [name]: value });
  }



  useEffect(() => {
    getdata()
  }, []);

  useEffect(() => {
    onformsubmit()
   }, []);
   
  const onformsubmit = async (e) => {
 e.preventDefault()
    try {
      const url = "https://red-walrus-11.loca.lt/api/v1/products/product/"+id;
      const res = await axios.put(url,input);
      console.log("res........", res)
      toast.success("update successfully!") 
    } catch {
      console.warn("error")
    }
    
    navigate("/products")
  }


  const getdata = async (e) => {
    try {
      const url = "https://red-walrus-11.loca.lt/v1/products/product/" + id;
      const res = await axios.get(url);
      console.log(res.data.data);
      setinput(res.data.data);
    } catch {
      console.warn("error");
    }
  };


  // const loaduser = async (e) => {
  //   try {
  //     const url = "http://localhost:5000/api/v1/products/product/"+id;
  //     const res = await axios.get(url);

  //   console.log(res.data.data)
  //   setinput(res.data.data)

  //   } catch {
  //     console.warn("error")
  //   }
  // }
  return (
    <>
      <div className='addproductformmain'>
        <div className='addproductform'>
          <h2>Details Products</h2>
          <div>
            <form onClick={getdata}>
              <div>
                <label>Product Title</label>
              </div>
              <div>
                <input type="text" name='title' value={input.title} onChange={inputHandler} />
              </div>
              <div>
                <label>Product Description</label>
              </div>
              <div>
                <textarea name='description' value={input.description} onChange={inputHandler} />
              </div>
              <div>
                <label>Product Photo</label>
              </div>
              <div>
                <input type="file" name='photo' value={input.photo} onChange={inputHandler} />
              </div>
              <div>
                <label>Product Price</label>
              </div>
              <div>
                <input type="text" name="price" value={input.price} onChange={inputHandler} />
              </div>

              <div>
                <label>Product StockQuantity</label>
              </div>
              <div>
                <input type="text" name='stockQuantity' value={input.stockQuantity} onChange={inputHandler} />
              </div>
              <div>
                <label>Product rating</label>
              </div>
              <div>
                <input type="text" name='rating' value={input.rating} onChange={inputHandler} />
              </div>
              <div>
                <label>Product category</label>
              </div>
              <div>
                <input type="text" name='category' value={input.category.type} onChange={inputHandler} />
              </div>
              <div>
                <label>Product owner</label>
              </div>
              <div>
                <input type="text" name='owner' value={input.owner.name} onChange={inputHandler} />
              </div>
              <div>
                <label>Product brands</label>
              </div>
              <div>
                <input type="text" name='productBrand' value={input.productBrand.name} onChange={inputHandler} />
              </div>
              <div>
                <label>Product type</label>
              </div>
              <div>
                <input type="text" name='productType' value={input.productType.name} onChange={inputHandler} />
              </div>

              <div>
                <button type='submit' onClick={(e)=>onformsubmit(e)}>Upate product</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Edit