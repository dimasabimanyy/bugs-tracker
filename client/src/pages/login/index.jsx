import "./style.scss";
import React from 'react'
import LoginBanner from './components/login-banner';
import LoginForm from './components/login-form';

const index = () => {
  return (
    <div className='login flex-center w-100'>
      <LoginBanner />
      <LoginForm />
    </div>
  )
}

export default index;
