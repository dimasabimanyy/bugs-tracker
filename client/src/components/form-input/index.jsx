import "./style.scss";
import React from 'react'

export const Input = (args) => {
  const { label, placeholder, state, type, className, isLast } = args;

  return (
    <input type={type} label={label} placeholder={placeholder} ref={state} className={`${className ? className : ''} ${isLast && "no-mb"} br-2`} autoComplete={type === "password" ? "on" : "off"} />
  )
}