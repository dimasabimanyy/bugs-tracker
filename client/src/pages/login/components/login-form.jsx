import React, { useState, useRef } from 'react';
import Google from "../assets/google.png";
import { Input } from "../../../components/form-input/index.jsx";

const LoginForm = () => {
  const authentication = useRef(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [activeTab, setActiveTab] = useState('login');
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const changeActiveTab = (tab) => {
    setActiveTab(tab);
    // setName('');
    // setEmail('');
    // setPassword('');
  }

  let login  = [
    {
      label: 'Email',
      type: "text",
      placeholder: 'Email',
      ref: email
    },
    {
      label: 'Password',
      type: "password",
      placeholder: 'Password',
      ref: password
    }
  ]

  let register = [
    ...login,
    {
      label: 'Name',
      type: "text",
      placeholder: 'Enter your name',
      ref: name,
    }
  ]

  const handleAuthForm = (e) => {
    e.preventDefault();

    console.log(name.current.value);
    e.target.reset();
    // if (activeTab === 'login') {
    //   // logic login here

    //   return 'login';
    // } else {
    //   // logic register here

    //   return 'register';
    // }
  }

  return (
    <div className="login-form">
      <div className="login-form-container">
        {/* Swiitch between login and register */}
        <div className="login-form-switch cursor-pointer">
          <div className={`switch-login ${activeTab === "login" && "active"}`} onClick={() => changeActiveTab("login")}>
            Login
          </div>
          <div className={`switch-register ${activeTab === "register" && "active"}`} onClick={() => changeActiveTab("register")}>
            Register
          </div>
        </div>

        {/* Auth with social media or google */}
        <div className="login-form-auth">
          <div className="login-auth cursor-pointer br-2">
            <div>
              <img src={Google} alt="Google" />
            </div> 
            <div className="b-500">
              Continue with google
            </div>
          </div>
        </div>

        {/* --- or --- */}
        <div className="login-form-or">
          <div className="line"></div>
          <div className="line-or">or</div>
          <div className="line"></div>
        </div>

        {/* Login with email and password */}
        <form className="login-form-inputs" onSubmit={handleAuthForm}>
          {activeTab === "login" ? login.map((input, index) => {
            return (
              <div className="login-form-input" key={index}>
                <Input
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  state={input.ref}
                  isLast={index === login.length - 1}
                />
              </div>
            )
          }) : register.map((input, index) => {
            return (
              <div className='login-form-input' key={index}>
                <Input
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  state={input.ref}
                  isLast={index === register.length - 1}
                />
              </div>
            )
          })}

          {activeTab === "login" ? (
            <div className="login-form-forgot">
              <a href="/forgot-password" className='reset-anchor'>Forgot your password ?</a>
            </div>
          ) : (
            <div className="login-form-policy">
              <input type="checkbox" name="agreement" id="agreement" />
              <div>
                I agree to the <a href="/" className='b-600 reset-anchor'>terms of service</a> and <a href="/" className='b-600 reset-anchor'>privacy policy</a>.
              </div>
            </div>
          )}

          <button type="submit" className='btn-full'>
            {"Continue >"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm