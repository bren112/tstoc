import React, {useState} from 'react';
import './navbar.css'
import { Link } from 'react-router-dom';
import logo from './logo.png'
function Navbar() {
    const [active , setActive] = useState("nav__menu");
    const [toggleIcon , setToggleIcon] = useState("nav__toggler"); 

    const navToggle = () =>{
        active === 'nav__menu' ? setActive('nav__menu nav__active') : setActive('nav__menu');

        toggleIcon === 'nav_toggler' ? 
        setToggleIcon('nav__toggler toggle')
        : setToggleIcon("nav__toggler")
    }


  return (
    <nav className='nav'>
      <div className="logo">
    {/* <Link to="/" className="nav__brand" id='logo'>FESTFY</Link> */}
    <img id='logo' src={logo} alt="" srcset="" />
      </div>
    <ul id='links' className={active}>
        <li className="nav__item"><Link to="/" className="nav__link">Home</Link></li>
        <li className="nav__item"><Link to="/criar_despesa" className="nav__link">Nova Despesa</Link></li>
        <li className="nav__item"><Link to="/solicitar_ordem" className="nav__link">Solicitar OC</Link></li>
        <li className="nav__item"><Link to="/lista_ordem" className="nav__link">OC Solicitadas</Link></li>
        <li className="nav__item"><Link to="/anual" className="nav__link">Anual</Link></li>
        <li className="nav__item"><Link to="/anualcreate" className="nav__link">Criar Anual</Link></li>
 


    </ul>
    <div onClick={navToggle} className={toggleIcon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
    </div>
</nav>
  )
}

export default Navbar;