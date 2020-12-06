import React from 'react';
import axios from 'axios'

class GarbageItem extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      productType: this.props.productType,
      productQuantity: this.props.productQuantity,
      stateOfProduct: this.props.stateOfProduct, 
      idUsera: this.props.idUsera,
      key: this.props.key
    }
    this.handleCollected = this.handleCollected.bind(this);
    this.handleNonCollected = this.handleNonCollected.bind(this);
  }
  
  async handleCollected(){
    try {
    const res = await axios.patch("http://localhost:8090/givers/resolveProduct", {
      "productId" : this.state.idUsera,
      "stateOfProduct": "closed"
    }, { 
      headers: { 
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNkMDg4NjdiNTVmNTBiMGZjMjFiNjQiLCJ1c2VyVHlwZSI6ImdpdmVyIiwiaWF0IjoxNjA3MjcyNTgyfQ.501Yks3GfqD8f9TkaOdUFNEzZ_PHELx4bOEh-NsPPBM`
      }
    });
  } catch (error) {
    console.log(error);
  }
  }
  async handleNonCollected(){
    try {
    const res = await axios.patch("http://localhost:8090/givers/resolveProduct", {
      "productId" : this.state.idUsera,
      "stateOfProduct": "open"
    }, { 
      headers: { 
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNkMDg4NjdiNTVmNTBiMGZjMjFiNjQiLCJ1c2VyVHlwZSI6ImdpdmVyIiwiaWF0IjoxNjA3MjcyNTgyfQ.501Yks3GfqD8f9TkaOdUFNEzZ_PHELx4bOEh-NsPPBM`
      }
    });
  } catch (error) {
    console.log(error);
  }
  }
  render(){
    
    if (this.state.stateOfProduct === "claimed") {
      return (
        <div className="rounded p-1 list-items-giver">
          <p className="mb-2">
            {this.state.productType} 
            <button className="btn btn-success ml-5 btn-sm" onClick={this.handleCollected}>Pokupljeno</button>
            <button className="btn btn-danger ml-2 btn-sm" onClick={this.handleNonCollected}>Nije pokupljeno</button></p>
        </div>
      )
    }
    else {
      return (
        <div className="list-items-giver p-1" >
          <p className="mb-2">{this.state.productType}</p>
          {/* <span>{this.state.productQuantity}</span> 
          <span>{this.state.stateOfProduct}</span> */}
        </div>
      )
    }

    }
}
export default GarbageItem;