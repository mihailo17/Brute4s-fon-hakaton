import React, { Component } from 'react';
import axios from 'axios';
import GarbageItem from './GarbageItem';

export default class Giver extends Component{
  constructor(props) {
    super(props);
    this.state = {
      usersGarbage: []
    }
  }
  async componentDidMount() {
    const garbage = await this.getAllUsersGarbage();
    this.setState({
      usersGarbage: garbage,
    })
    console.log(this.state.usersGarbage);
  }
  
  async getAllUsersGarbage() {
    const token = sessionStorage.getItem("user-token");
    const response = await axios.get("http://localhost:8090/givers/getMyProducts", { 
      headers: { 
          'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }

  submitGiverForm(event) {
    event.preventDefault();
  }
  
  render(){
    
    return (

      <div className="container">
        <h2>Lista: </h2>
        
      {
        this.state.usersGarbage.map(item => {
          <span>{item}</span>
          
          // <GarbageItem 
          //   productType={item.productType} 
          //   stateOfProduct={item.stateOfProduct}
          //   lat={item.lat}
          //   lng={item.lng}
          //   quantity={item.quantity}
          //   >
          // </GarbageItem>
        })
      }

        <h2>Prijavi otpad za sakupljanje:</h2>
        <form onSubmit={this.submitGiverForm} id="giver-submit-form">
          
          {/* <div className="form-group mb-3">
            <label htmlFor="adresa">Adresa predaje: </label>
            <br></br>
            <input className="form-control-lg" type="text" name="adresa" id="adresa"></input>
          </div>      */}
  
          <div className="form-group"></div>
  
          <div className="custom-control custom-checkbox mb-1">
            <input className="custom-control-input" type="checkbox" id="metal" name="metal" value="metal"></input>
            <label className="custom-control-label" htmlFor="metal">Metal</label>
          </div>
          
          <div className="custom-control custom-checkbox mb-1">
            <input className="custom-control-input" type="checkbox" id="staklo" name="staklo" value="staklo"></input>
            <label className="custom-control-label" htmlFor="staklo">Staklo</label>
          </div>
          
          <div className="custom-control custom-checkbox mb-1">
            <input className="custom-control-input" type="checkbox" id="papir" name="papir" value="papir"></input>
            <label className="custom-control-label" htmlFor="papir">Papir</label>
          </div>
          
          <div className="custom-control custom-checkbox mb-1">
            <input className="custom-control-input" type="checkbox" id="plastika" name="plastika" value="plastika"></input>
            <label className="custom-control-label" htmlFor="plastika">Plastika</label>
          </div>
          
          <div className="form-group mb-3">
            <label htmlFor="kolicina">Kolicina u kilogramima</label>
            <br></br>
            <input className="form-control-lg" type="number" name="kolicina" id="kolicina"></input>
          </div>
              
          <input className="btn btn-primary" type="submit" value="Posalji"></input>
        </form>
      </div>
      )
     }
  
  }