import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import mobile from "/images/mobile.png"

function Landing() {

  const router = useNavigate();

  return (
    <div className='landing-container'>
      <div className="nav">
        <div className="left-nav">
          <h2>Video Meet</h2>
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

      
      <div className='main_box'>
      <input type="checkbox" id="check" style={{color: "white"}}/>
      
      <div className="btn_one">
          <label htmlFor="check">
            <i className="fa-solid fa-bars"></i>
          </label>
      </div>

      <div className="sidebar_menu">
        <div className="logo">
          <Link to={"/"}>Video Meet</Link>
        </div>

        <div className="btn_two">
          <label htmlFor="check" >
            <i className="fa-solid fa-xmark"></i>
          </label>
        </div>

        

        <div className="menu">
          <ul>
            <li>
              <i className="fa-solid fa-lock-open"></i>
              <Link to={"/guest"}>Join as Guest</Link>
            </li>
            <li>
              <i className="fa-solid fa-right-to-bracket"></i>
              <Link to={"/auth"}>Register</Link>
            </li>
            <li>
            <i className="fa fa-lock"></i>
            <Link to={"/auth"}>Log In</Link>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Landing