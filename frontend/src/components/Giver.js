import React, { Component } from 'react';
import axios from 'axios';
import GarbageItem from './GarbageItem';


export default class Giver extends Component{
  constructor(props) {
    super(props);
    this.state = {
      usersGarbage: [],
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
    this.forceUpdate();   
    
  }

  async submitGiverForm(event) {
    const materialQuality = document.getElementById("materialQuality").value;
    const materialQuantity = document.getElementById("quantity").value
    event.preventDefault();
    
    const response = await axios.post("http://localhost:8090/givers", );
    
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
  
          <div className="form-group">
          <select name="material-quality" id="material-quality">
            <option value="metal">Metal</option>
            <option value="plastika">Plastika</option>
            <option value="staklo">Staklo</option>
            <option value="papir">Papir</option>
          </select>
          </div>
          
          <div className="form-group mb-3">
            <label htmlFor="quantity">Kolicina u kilogramima</label>
            <br></br>
            <input className="form-control" type="number" name="quantity" id="quantity"></input>
          </div>
              
          <input className="btn btn-primary" type="submit" value="Posalji"></input>
        </form>
      </div>
      )
     }
  }