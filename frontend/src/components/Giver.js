import React from 'react';
import axios from 'axios';

function submitGiverForm(e) {
  e.preventDefault();
}

export default function Giver() {
  return (
    <>
    <h2>Prijavi otpad za sakupljanje:</h2>
    <form onSubmit={submitGiverForm} id="giver-submit-form">
      
      <div className="form-group">
        <label for="adresa">Adresa predaje: </label>
        <input type="text" name="adresa" id="adresa"></input>
      </div>     

      <div className="form-group">
        <input checked type="checkbox" id="metal" name="metal" value="metal"></input>
        <label for="metal">Metal</label>
      </div>
      
      <div className="form-group">
        <input checked type="checkbox" id="staklo" name="staklo" value="staklo"></input>
        <label for="staklo">Staklo</label>
      </div>
      
      <div className="form-group">
        <input checked type="checkbox" id="papir" name="papir" value="papir"></input>
        <label for="papir">Papir</label>
      </div>
      
      <div className="form-group">
        <input checked type="checkbox" id="plastika" name="plastika" value="plastika"></input>
        <label for="plastika">Plastika</label>
      </div>
      
      <div className="form-group">
        <label for="kolicina">Kolicina u kilogramima</label>
        <input type="number" name="kolicina" id="kolicina"></input>
      </div>
          
      <input type="submit" value="Posalji"></input>
    </form>
    </>
  )
}