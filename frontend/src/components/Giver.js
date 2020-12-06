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
      productType: "",
      key: ""
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
      
    const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNkMDg4NjdiNTVmNTBiMGZjMjFiNjQiLCJ1c2VyVHlwZSI6ImdpdmVyIiwiaWF0IjoxNjA3MjcyNTgyfQ.501Yks3GfqD8f9TkaOdUFNEzZ_PHELx4bOEh-NsPPBM";
          
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
        <h3 className="mb-4">Lista prijavljenih predaja materijala: </h3>
      {
        this.state.usersGarbage.map((item, i) => {
      return(
      
      <GarbageItem 
        productType={item.productType} 
        stateOfProduct={item.stateOfProduct}
        lat={item.lat}
        lng={item.lng}
        quantity={item.quantity}
        key={i}
        idUsera={item._id}

        >
      </GarbageItem>)
        })
      }

        <h3 className="mt-4">Prijavi otpad za sakupljanje:</h3>
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
          productId={this.state._id}
          >
        </MapGiver>
      </div>
      )
     }
  }