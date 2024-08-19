import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import mobile from "/images/mobile.png"

function Landing() {

  const router = useNavigate();

  return (
    <div className='landing-container'>
      <div className="nav">
        <div className="left-nav">
          <h2>VC FOR YOU</h2>
        </div>
        <div className="right-nav">
          <p onClick={() => {router("/guest")}}>Join as Guest</p>
          <p onClick={() => {router("/auth")}}>Register</p>
          <div onClick={() => {router("/auth")}} role='button' className="login">
            <p>Log In</p>
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="main-left">
          <h1><span style={{color: "rgb(255, 111, 255)"}}>Connect</span> to the Farthest Distance</h1>
          <p>with the features we provide</p>
          <div role='button' className="get-started">
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>
        <div className="main-right">
          <img src={mobile} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Landing