import React from 'react'
import { useState, useEffect } from 'react';
// import './pages.css';
import axios from 'axios';
import { Link, useParams} from 'react-router-dom';

import "react-toastify/dist/ReactToastify.css";

const Getdetails = () => {
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


  useEffect(() => {
    getdata()
  }, []);

  

  const getdata = async (e) => {
    try {
      const url = "http://localhost:5000/api/v1/products/product/" + id;
      const res = await axios.get(url);
      console.log(res.data.data);
      setinput(res.data.data);
      
    } catch {
      console.warn("error");
    }
  };

  return (
    <>
      <div className='addproductformmain'>
        <div className='addproductform'>
          <h2>Details Products</h2>
          <div>
            <form onClick={getdata}>
              <div>
                <label><h2>Product Title</h2></label>
              </div>
              <div>
                <h4 name='title'>{input.title}</h4>
              </div>
              <div>
                <label>Product Description</label>
              </div>
              <div>
              <p name='description'>{input.description}</p>
        
              </div>
           
              <div>
                <img type="file" name='photo' src={input.imgUrl} />
              </div>
              <div>
                <label>Product Price :-</label>
              </div>
              <div>
              <p name="price">{input.price}</p>
            
              </div>

              <div>
                <label>Product StockQuantity :-</label>
              </div>
              <div>
              <p name='stockQuantity'>{input.stockQuantity}</p>
                
              </div>
              <div>
                <label>Product rating :-</label>
              </div>
              <div>
              <p name='rating'>value={input.averageRating}</p>
             
              </div>
              <div>
                <label>Product category :-</label>
              </div>
              <div>
              <p name='category'>{input.category.type}</p>
                
              </div>
            
              <div>
                <label>Product brands :-</label>
              </div>
              <div>
              <p name='productBrand'>{input.productBrand.name}</p>
               
              </div>
              <div>
                <label>Product type :-</label>
              </div>
              <div>
              <p name='productType' >{input.productType.name}</p>
               
              </div>
              <div><Link to="/products"><button>Back To Product</button></Link></div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Getdetails;