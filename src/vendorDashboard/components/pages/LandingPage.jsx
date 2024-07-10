import React from 'react'
import NavBar from '../NavBar'
import SideBar from '../SideBar'
import Login from '../forms/Login'
import Register from '../forms/Register'
import AddFirm from '../forms/AddFirm'
import AddProduct from '../forms/AddProduct'
import { useState, useEffect} from 'react'
import Welcome from '../Welcome'
import AllProducts from '../AllProducts'



const LandingPage = () => {
  
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showAddFirm, setShowAddFirm] = useState(false)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [showLogOut, setShowLogOut] = useState(false)
  const [showFirmTitle, setShowFirmTitle] = useState(true)

  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken');
    console.log(loginToken)
    if(loginToken){
      setShowLogOut(true);
    }

  },[]);

  useEffect(() => {
    const firmName = localStorage.getItem('firmName');
    if(firmName){
      setShowFirmTitle(false)
    }
  },[]);

  const logOutHandler = () => {
    confirm("Are you sure to logout ??")
    localStorage.removeItem('loginToken');
    localStorage.removeItem('firmId');
    localStorage.removeItem('firmName');
    setShowLogOut(false);
    setShowFirmTitle(true);
  }
   

  const showLoginHandler = () => {
    setShowLogin(true)
    setShowRegister(false)
    setShowAddFirm(false)
    setShowAddProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)

  }

  const showRegisterHandler = () => {
    setShowRegister(true)
    setShowLogin(false)
    setShowAddFirm(false)
    setShowAddProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }

  const showAddFirmHandler = () => {
    if(showLogOut){
    setShowAddFirm(true)
    setShowLogin(false)
    setShowRegister(false)
    setShowAddProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }
  else{
    alert("please Login!");
    setShowLogin(true)
    setShowRegister(false)
  }
  }

  const showAddProductHandler = () => {
    if(showLogOut){
    setShowAddProduct(true)
    setShowAddFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowWelcome(false)
    setShowAllProducts(false)
    }else{
      alert("please Login!");
      setShowLogin(true)
      setShowRegister(false)
    }

  }

  const showWelcomePage = () => {
    setShowWelcome(true)
    setShowAddProduct(false)
    setShowAddFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowAllProducts(false)
  }

  const  ShowAllProducts = () => {
    if(showLogOut){
    setShowWelcome(false)
    setShowAddProduct(false)
    setShowAddFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowAllProducts(true)
  }else{
    alert("please Login!");
    setShowLogin(true)
    setShowRegister(false)
  }
  }

  return (
  <>
    <section>
      <NavBar showLoginHandler = {showLoginHandler} showRegisterHandler = {showRegisterHandler } showLogOut = {showLogOut} logOutHandler = {logOutHandler}/>
      <div className='collectionSection'>
      <SideBar showFirmTitle = {showFirmTitle} showAddFirmHandler = {showAddFirmHandler} showAddProductHandler = {showAddProductHandler}  ShowAllProducts = { ShowAllProducts }/>
      {showLogin && <Login showWelcomePage = {showWelcomePage}/>}
      {showRegister && <Register showLoginHandler = {showLoginHandler}/>}
      {showAddFirm &&  showLogOut && <AddFirm/>}
       {showAddProduct &&  showLogOut && <AddProduct/>}
       {showWelcome && <Welcome/>}
      {showAllProducts && showLogOut && <AllProducts/>}

      </div>
      
    </section>
    </>
  )
}

export default LandingPage
