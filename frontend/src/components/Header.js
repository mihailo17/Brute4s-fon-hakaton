import React from 'react';
import Logo from "./logo.png"
export default function Header() {
  return (
    <header className="container border-bottom-1">
        <div className="mb-4 pt-3"><img className="logo" src={Logo} alt=""></img></div>
        {/* <h1 className="mb-3 text-center">Garbage collector</h1> */}
        <h5 className="text-center mb-5">Aplikacija za povezivanje sakupljača sekundarnih sirovina i krajnjih korisnika</h5>     
    </header>
  )
}