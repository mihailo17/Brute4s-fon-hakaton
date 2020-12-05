import React from 'react';
import axios from 'axios';

function submitForm(e){
  e.preventDefault();

}

export default function Register() {
  return (
    <form onSubmit={submitForm} id="register-form">
      <div className="form-group"> 
        <label for="select-user-type">Izaberi tip korisnika:</label>
        <select id="select-user-type" name="select-user-type">
          <option value="giver">Donator</option>
          <option value="receiver">Skupljac</option>
        </select>
      </div>
      <div className="form-group">
        <label for="email">Email</label>
        <input type="email" name="email" id="email"></input>
      </div>
      <div className="form-group">
        <label for="password">Sifra</label>
        <input name="password" id="password" type="password"></input>
      </div>
      <div className="form-group">
        <input type="submit" value="Registruj se"></input>
      </div>
    </form>
    
  )
}