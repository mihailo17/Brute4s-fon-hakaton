import React from 'react';
import axios from 'axios';

async function submitRegisterForm(e){
  e.preventDefault();
  const selectUserType = document.getElementById("select-user-type").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  try {
   
    if (selectUserType === "giver") {
      const response = await axios.post("http://localhost:8090/givers", {email, password});
      console.log(response)
      // sacuvam token iz responsa i da ulogujem usera i preusmerim na giver stranicu
    }
    else {
      // ovde preusmerim na receiver stranicu http://localhost:8090/receivers
    }
    
  } catch (error) {
    console.log(error)
  }
}

export default function Register() {
  return (
    <form onSubmit={submitRegisterForm} id="register-form">
      <div className="form-group"> 
        <label htmlFor="select-user-type">Izaberi tip korisnika:</label>
        <select id="select-user-type" name="select-user-type">
          <option value="giver">Donator</option>
          <option value="receiver">Sakupljac</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email"></input>
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Sifra</label>
        <input name="password" id="password" type="password"></input>
      </div>
      
      <div className="form-group">
        <input type="submit" value="Registruj se"></input>
      </div>
    </form>
    
  )
}