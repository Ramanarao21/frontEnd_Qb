import React from 'react'
import { Link } from 'react-router-dom'


const NotFound = () => {
  return (
    <div className='errorSection'>
        <Link to={"/"} style={{fontSize:'25px', color:'darkblue'}}>
           <p>go back</p>
        </Link>
      <h1>404 Error !!</h1>
      <div>
        Page Not Found
      </div>
    </div>
  )
}

export default NotFound
