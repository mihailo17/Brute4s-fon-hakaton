import React from 'react';
import { Link } from 'react-router-dom'

export default function Homepage() {
  
  return (
  <>
    <h1>Dobrodosli u aplikaciju</h1>
    
    <h2>Molimo ulogujte se ili registrujte da biste koristili aplikaciju</h2>
    
    <div className="welcome">
      <Link to="/register">Registrujte se</Link>
      <Link className="link" to="/login">Ulogujte se</Link>
    </div>
  </>
  )
}