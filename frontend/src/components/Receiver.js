import React from 'react';

function submitForm(e) {
    e.preventDefault();
}

export default function Receiver() {
  return(
    <>
      <h2>Filtriraj rezultate:</h2>
      <h3>Sirovine</h3>
      <form onSubmit={submitForm} id="filter-materials">
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
      <input type="submit" value="Primeni"></input>
      </form>
      <div>
        <h2>Lokacije sa donatorima sirovina: </h2>
        <h3>Oznacite lokacije sa kojih zelite da sakupite: </h3>
        <input type="submit" value="Potvrdi"></input>
        <div> Div sa mapom:</div>
      </div>
    </>
  ) 
}