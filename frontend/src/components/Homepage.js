import React from 'react';
import { Link } from 'react-router-dom'

export default function Homepage() {
  
  return (
  <div className="container">
    <div className="jumbotron text-center">
      <h1 className="mb-4">Dobrodosli u aplikaciju</h1>
      
      <h2 className="mb-4">Molimo ulogujte se ili registrujte da biste koristili aplikaciju</h2>
      
      <div className="welcome">
        <Link className="btn btn-primary mr-4" to="/register">Registrujte se</Link>
        <Link className="link btn btn-secondary" to="/login">Ulogujte se</Link>
      </div>
    </div>
  </div>
  )
}