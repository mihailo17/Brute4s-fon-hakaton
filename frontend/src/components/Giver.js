import React from 'react';
import axios from 'axios';

function submitGiverForm(event) {
  event.preventDefault();
}

export default function Giver() {
  return (

    <>
      <h2>Prijavi otpad za sakupljanje:</h2>
      <form onSubmit={submitGiverForm()} id="giver-submit-form">
        
        <div className="form-group">
          <label htmlFor="adresa">Adresa predaje: </label>
          <input type="text" name="adresa" id="adresa"></input>
        </div>     

        <div className="form-group">
          <input checked type="checkbox" id="metal" name="metal" value="metal"></input>
          <label htmlFor="metal">Metal</label>
        </div>
        
        <div className="form-group">
          <input checked type="checkbox" id="staklo" name="staklo" value="staklo"></input>
          <label htmlFor="staklo">Staklo</label>
        </div>
        
        <div className="form-group">
          <input checked type="checkbox" id="papir" name="papir" value="papir"></input>
          <label htmlFor="papir">Papir</label>
        </div>
        
        <div className="form-group">
          <input checked type="checkbox" id="plastika" name="plastika" value="plastika"></input>
          <label htmlFor="plastika">Plastika</label>
        </div>
        
        <div className="form-group">
          <label htmlFor="kolicina">Kolicina u kilogramima</label>
          <input type="number" name="kolicina" id="kolicina"></input>
        </div>
            
        <input type="submit" value="Posalji"></input>
      </form>
    </>
    )
  }