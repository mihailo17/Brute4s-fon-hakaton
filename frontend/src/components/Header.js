import React from 'react';
import Logo from '../logo.svg';

export default function Header() {
  return (
    <header>
      <div className="logo">
        <img className="logo" src={Logo} alt=""></img>
      </div>
      <h3>Aplikacija za spajanje sakupljaca i donatora sekundarnih sirovina</h3>
    </header>
  )
}