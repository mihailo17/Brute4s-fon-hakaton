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
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNjZWI0NDg1ZDlkMDc3ZGY4OGMyM2MiLCJ1c2VyVHlwZSI6ImdpdmVyIiwiaWF0IjoxNjA3MjY1MDkyfQ.VFlpXIhl9q1Tf894E7c4XDTEr4mabpvYxLin5GNgPlc`
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
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNjZWI0NDg1ZDlkMDc3ZGY4OGMyM2MiLCJ1c2VyVHlwZSI6ImdpdmVyIiwiaWF0IjoxNjA3MjY1MDkyfQ.VFlpXIhl9q1Tf894E7c4XDTEr4mabpvYxLin5GNgPlc`
      }
    });
  } catch (error) {
    console.log(error);
  }
  }
  render(){
    
    if (this.state.stateOfProduct === "claimed") {
      return (
        <li>
          <span>{this.state.productType}</span>
          <span>{this.state.productQuantity}</span> 
          <span>{this.state.stateOfProduct}</span>
          <button className="success" onClick={this.handleCollected}>Pokupljeno</button>
          <button className="danger" onClick={this.handleNonCollected}>Nije pokupljeno</button>
        </li>
      )
    }
    else {
      return (
        <li>
          <span>{this.state.productType}</span>
          <span>{this.state.productQuantity}</span> 
          <span>{this.state.stateOfProduct}</span>
        </li>
      )
    }

    }
}
export default GarbageItem;