import React from 'react';

class GarbageItem extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      productType: this.props.productType,
      productQuantity: this.props.productQuantity,
      stateOfProduct: this.props.stateOfProduct
    }
  }
  render(){
    return (
      <li>
        <span>{this.state.productType}</span>
        assaasas
      </li>
      
    )}
}
export default GarbageItem;