import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
// import Details from "./Details"


function Products() {
  const [product, setproduct] = useState([])

  const [search, setSearch] = useState("");

  const [loading, setloading] = useState(true)
  const [currentpage, setcurrentpage] = useState(1);
  const [postperpage, setpostperpage] = useState(4);
  // const [counter,setcounter]=useState(1)

  useEffect(() => {
    
    getAllproduct();
  }, []);

  const getAllproduct = async () => {
    setTimeout(() => setloading(false), 1000) 
    try {
      const url = "http://localhost:5000/api/v1/products/product";
      const res = await axios.get(url);
      // console.log(res.data.data);

      setproduct(res.data.data);
      setloading(true)
    } catch {
      console.warn("error")
    }
  }
  console.log(product)

  // useEffect (()=>{
  // onDelete();
  // },[])

  const onDelete = async (id) => {
    try {
      const url = "http://localhost:5000/api/v1/products/product/" + id;
      const res = await axios.delete(url);
      alert("delete succefully !")
      getAllproduct();
    } catch {
      console.warn("error")
    }

  }

  const indexoflastpost = currentpage * postperpage;
  const indexoffirstpost = indexoflastpost - postperpage;
  // const currentposts = product.slice(indexoffirstpost, indexoflastpost)
  const totalpost = product.length;
  console.log("...............", totalpost)


  const pagenumber = [];
  for (let i = 1; i <= Math.ceil(totalpost / postperpage); i++) {
    pagenumber.push({ i })
  }

  console.log(pagenumber)

  const onchangebutton = (type) => {
    if (type === "next") {
      if (Math.ceil(totalpost / postperpage) === currentpage) {
        setcurrentpage(currentpage)
      } else {
        setcurrentpage(currentpage + 1)
      }

    } else if (type === "prev") {
      if (currentpage === 1) {
        setcurrentpage(1)
      } else {
        setcurrentpage(currentpage - 1)
      }
    }
  }

  return (

    <div className='products'>
      <div>
        <input
          className="searchbar"
          type="text"
          placeholder="search"
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link to="/addproducts">
          <button className="addproduct" variant="contained">
            Add Product
          </button>
        </Link>
      </div>
      <table id="customers">
        <tr>
          <th>S.No.</th>
          <th>Product Category</th>
          <th>Product Brand</th>
          <th>Product Type</th>
          <th>Product Quantity</th>
          <th>Product Image</th>
          <th>Product Description</th>
          <th>Title</th>
          <th>Price</th>
          <th>Edit/Delete</th>
        </tr>

        {
          loading ? <p>loading.........<CircularProgress /></p>:product.filter((product) =>
        product.title.toLowerCase().includes(search)).slice(indexoffirstpost, indexoflastpost).map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {/* <td>{item.id}</td> */}
              <td>{item.category.type}</td>
              <td>{item.productBrand.name}</td>
              <td>{item.productType.name}</td>
              <td>{item.stockQuantity}</td>
              <td>{<img style={{ height: "100px", width: "200px" }} src={item.imgUrl} />}</td>
              <td>{item.description}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td><button><Link to={`/getdetails/${item.id}`}>Details</Link> </button><button><Link to={`/edit/${item.id}`}>Edit</Link></button>  <button onClick={() => onDelete(item.id)}>Delete</button></td>
       
            </tr>


          ))}
      </table>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => onchangebutton("prev")}>prev</button>
        <ul style={{ display: "flex", listStyle: "none" }}>
          {pagenumber.map((elem, index) => (
            <li style={{ cursor: "pointer" }} onClick={() => setcurrentpage(index + 1)}>{index + 1}</li>
          ))}

        </ul>
        <button onClick={() => onchangebutton("next")}>next</button>

      </div>
    </div>
  );
}

export default Products;