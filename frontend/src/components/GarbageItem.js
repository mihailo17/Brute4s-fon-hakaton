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
      productId: this.props._id
    }
    this.handleCollected = this.handleCollected.bind(this);
    this.handleNonCollected = this.handleNonCollected.bind(this);
  }
  
  handleCollected(){
    const res = axios.patch("http://localhost:8090/givers/resolveProduct", {
      "productId" : this.state._id,
      "stateOfProduct": "closed"
    }, { 
      headers: { 
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNjZWI0NDg1ZDlkMDc3ZGY4OGMyM2MiLCJ1c2VyVHlwZSI6ImdpdmVyIiwiaWF0IjoxNjA3MjY1MDkyfQ.VFlpXIhl9q1Tf894E7c4XDTEr4mabpvYxLin5GNgPlc`
      }
    });
  }
  handleNonCollected(){
    const res = axios.patch("http://localhost:8090/givers/resolveProduct", {
      "productId" : this.state._id,
      "stateOfProduct": "open"
    }, { 
      headers: { 
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNjZWI0NDg1ZDlkMDc3ZGY4OGMyM2MiLCJ1c2VyVHlwZSI6ImdpdmVyIiwiaWF0IjoxNjA3MjY1MDkyfQ.VFlpXIhl9q1Tf894E7c4XDTEr4mabpvYxLin5GNgPlc`
      }
    });
  }
  render(){
    
    if (this.state.stateOfProduct === "claimed") {
      return (
        <div className="rounded p-1 list-items-giver">
          <p className="mb-0">
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