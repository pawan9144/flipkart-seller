import React, { useState } from 'react';
import './pages.css';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom"

// function createFormData(item) {


  //   let formData = new FormData();
  //   for (const key in item) {
  //     formData.append(key, item[key]);
  //   }
  //   return formData;
  // }

  function Addproducts() {

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

    const [items, setitems] = useState([])


    const navigate = useNavigate()


    const inputHandler = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      setinput({ ...input, [name]: value });
    }

    //   const Additem =(e)=>{
    // e.preventDefault();
    //     setitems([...items,input]);
    //     setinput("") // isse blank data v add horha
    //   }



    const Additem = async (e) => {
      e.preventDefault();
      if (!input) {

      } else {
        if(!input.title)
        {
          return toast.error("Please enter title")
        }
        else if (!input.description){
          return toast.error("Please enter description")
        }
        else if (!input.photo){
          return toast.error("Please select photo")
        }
        else if (!input.price){
          return toast.error("Pleas enter price")
        }
        else if (!input.category){
          return toast.error("Pleas enter category")
        }
        else if (!input.productType){
          return toast.error("Pleas enter product type")
        }
        else if (!input.productBrand){
          return toast.error("Pleas enter product brand")
        }
        else if (!input.owner){
          return toast.error("Pleas enter owner")
        }
        else if (!input.stockQuantity){
          return toast.error("Pleas enter quantity")
        }
        setitems([...items, input]);

        try {
          // const url = "http://localhost:5000/api/v1/products/product";
          // const res = await axios.post(url,items);  
          // // const myJSON = JSON.stringify(obj);
          // const  rel = JSON.stringify(res)
          // console.log(rel);
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzA0YWJjNGU0NDhjNzdlYjBkNDAzZCIsImlhdCI6MTY0ODYzNDQ3NCwiZXhwIjoxNjQ4NzIwODc0fQ.luE0iALmekjMD0kRuT21fhWh0cu1UQzmFMExWUO38gI'
          // const formData = await createFormData(input);
          // debugger;
          axios.post(
            'http://localhost:5000/api/v1/products/product',
            input,
            // formData,
            { headers: { 'Authorization': `Bearer ${token}` } }
          );
          toast.success("Add succesfully !")
          navigate("/products ")

        } catch {
          console.warn("error")
        }
      }


    }

    console.log(items)
    return (

      <>
        <div className='addproductformmain'>
          <div className='addproductform'>
            <h2>Add Products</h2>
            <div>
              <form onSubmit={Additem}>
                <div>
                  <label>Product Title</label>
                </div>
                <div>
                  <input type="text" name='title' value={input.title} onChange={inputHandler} />
                  {/* <select name="category" value={input.category} onChange={inputHandler}>
                  <option value="">Select category</option>
                  <option value="New Arrival">New Arrival</option>
                  <option value="Most Popular">Most Popular</option>
                  <option value="Trending">Trending</option>
                </select> */}
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
                  <input type="text" name='category' value={input.category} onChange={inputHandler} />
                </div>
                <div>
                  <label>Product owner</label>
                </div>
                <div>
                  <input type="text" name='owner' value={input.owner} onChange={inputHandler} />
                </div>
                <div>
                  <label>Product brands</label>
                </div>
                <div>
                  <input type="text" name='productBrand' value={input.productBrand} onChange={inputHandler} />
                </div>
                <div>
                  <label>Product type</label>
                </div>
                <div>
                  <input type="text" name='productType' value={input.productType} onChange={inputHandler} />
                </div>

                <div>
                  <button type='submit'>Add product</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default Addproducts;