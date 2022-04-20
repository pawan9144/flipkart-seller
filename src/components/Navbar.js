import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext} from 'react-icons';
import {useNavigate} from "react-router-dom"
import {AiOutlineSearch} from 'react-icons/ai';
import axios from 'axios';
import Profile from './profile';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [search,setsearch]=useState("")

  const showSidebar = () => setSidebar(!sidebar);
  let navigate = useNavigate()



  const inputsearching=(event)=>{
 const data = event.target.value;
 console.log(data)
 setsearch(data)

  }
  const searching=async(event)=>{
    event.preventDefault()

    try{
      const url = "http://localhost:5000/api/v1/products/product/search/"+search;
      const res = await axios.get(url);
    }catch{
      console.warn("error")
    }


  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <div className='menu-bars'>
            <div><FaIcons.FaBars onClick={showSidebar} /></div>
         
          <div className="search">
           <input id="outlined-basic" variant="outlined" placeholder="Search" name='search' value={search} onChange={inputsearching}/>
           <AiOutlineSearch onClick={searching}/>

           </div>
         <div  style={{color:"white",fontSize:"x-large",marginRight: '3rem',textDecoration:"none"}}><Profile/></div>
           
         <Link to="/" style={{textDecoration:"none"}}>
         <div style={{color:"white",fontSize:"x-large",marginRight: '3rem',textDecoration:"none"}}>signIn</div> 
      
          </Link>

        

          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
