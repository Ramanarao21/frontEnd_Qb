import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';
import { ThreeCircles } from 'react-loader-spinner';



const Login = ({showWelcomePage}) => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading, setLoading] = useState(false); 

  const loginHandler = async(e) => {
    e.preventDefault();
    setLoading(true); 

    try {

      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({email,password})
      })

      const data = await response.json();
      if(response.ok){
        alert('Login Succesfull')
        localStorage.setItem('loginToken' , data.token)
        showWelcomePage()
      }

      const vendorId = data.vendorId
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      window.location.reload()
      const vendorData = await vendorResponse.json();

      if(vendorResponse.ok){
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor.firm[0].firmName
        localStorage.setItem("firmName" , vendorFirmName);
        localStorage.setItem("firmId" , vendorFirmId);
        window.location.href = window.location.href;
      }

      
    } catch (error) {
      console.log("Vendor Login Failed" , error);
      alert("Vendor Login Failed")
      
    }finally {
      setLoading(false); 
    }
  }

  return (
    <div className='loginSection'>
      {loading && <div className="loaderSection">
        <ThreeCircles
          visible={loading}
          height={100}
          width={100}
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <p>Login in process... Please wait</p>
      </div>}
        {!loading && <form className='authForm' onSubmit={loginHandler}>

            <h3>Vendor Login</h3>
            <label>Email</label>
            <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='Enter your Email' /><br />
            <label>Password</label>
            <input type='password' name='password' value={password}  onChange={(e) => setPassword(e.target.value)}  placeholder='Enter your Password' /><br />

          <div className='btnSubmit'>
            <button type='submit'>
                Submit
            </button>

          </div>

        </form>}
      
    </div>
  )
}

export default Login
