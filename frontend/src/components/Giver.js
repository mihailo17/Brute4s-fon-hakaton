import React, { Component } from 'react';
import axios from 'axios';
import GarbageItem from './GarbageItem';
import MapGiver from './MapGiver';

export default class Giver extends Component{
  constructor(props) {
    super(props);
    this.state = {
      usersGarbage: [],
      token: "",
      productQuantity: 0,
      productType: ""
    }
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
  }
  handleChangeQuantity() {
    const productQuantitySelectValue = document.getElementById("product-quantity").value;
    this.setState({
      productQuantity: productQuantitySelectValue
    })
    
  }

  handleChangeType(){
    const productTypeValue = document.getElementById("product-type").value;
    this.setState({
      productType: productTypeValue
    })
   
  }
  async componentDidMount() {
      
    const token1 = sessionStorage.getItem("user-token");
          
    const response = await axios.get("http://localhost:8090/givers/getMyProducts", { 
      headers: { 
          'Authorization': `Bearer ${token1}`
      }
    });
    
    this.setState({
      token: token1
    })

    const garbage = response.data;
    
    this.setState({
      usersGarbage: garbage,
    })
    this.forceUpdate();    
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
          <select onChange={this.handleChangeType} className="form-control" name="product-type" id="product-type">
            <option value="metal">Metal</option>
            <option value="plastika">Plastika</option>
            <option value="staklo">Staklo</option>
            <option value="papir">Papir</option>
          </select>
          </div>
          
          <div className="form-group mb-3">
            <label htmlFor="quantity">Kolicina u kilogramima</label>
            <br></br>
            <input  onChange={this.handleChangeQuantity}  className="form-control" type="number" name="product-quantity" id="product-quantity"></input>
          </div>
        </form>

        <MapGiver 
        productQuantity={this.state.productQuantity}
        productType={this.state.productType}
        token={this.state.token}
        >
        </MapGiver>
      </div>
      )
     }
  }