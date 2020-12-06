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
    
    const token = sessionStorage.getItem("user-token");
    
    const response = await axios.get("http://localhost:8090/givers/getMyProducts", { 
      headers: { 
          'Authorization': `Bearer ${token}`
      }
    });
    const garbage = response.data;
    this.setState({
      usersGarbage: garbage,
    })
    console.log(this.state.usersGarbage);
    this.forceUpdate();    
  }

  async submitGiverForm(event) {
    const radio = document.querySelectorAll('[name="radio"]');
    event.preventDefault();
    const response = await axios.post("http://localhost:8090/givers",);

  }
  
  render(){
    
    return (

      <div className="container">
        <h2>Lista: </h2>
        
      {
        this.state.usersGarbage.map(item => {
      return(
      
      <GarbageItem 
        productType={item.productType} 
        stateOfProduct={item.stateOfProduct}
        lat={item.lat}
        lng={item.lng}
        quantity={item.quantity}
        key={item._id}
        >
      </GarbageItem>)
        })
      }

        <h2>Prijavi otpad za sakupljanje:</h2>
        <form onSubmit={this.submitGiverForm} id="giver-submit-form">
          
          <div className="form-group mb-3">
            <label htmlFor="adresa">Adresa predaje: </label>
            <br></br>
            <input className="form-control-lg" type="text" name="adresa" id="adresa"></input>
          </div>     
  
          <div className="form-group"></div>
  
          <div className="mb-1">
            <input className="" type="radio" id="metal" name="radio" value="metal"></input>
            <label className="" htmlFor="metal">Metal</label>
          </div>
          
          <div className="mb-1">
            <input className="" type="radio" id="staklo" name="radio" value="staklo"></input>
            <label className="" htmlFor="staklo">Staklo</label>
          </div>
          
          <div className="custom-control custom-checkbox mb-1">
            <input className="" type="radio" id="papir" name="radio" value="papir"></input>
            <label className="" htmlFor="papir">Papir</label>
          </div>
          
          <div className="mb-1">
            <input className="" type="radio" id="plastika" name="radio" value="plastika"></input>
            <label className="" htmlFor="plastika">Plastika</label>
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