import React, { Component } from 'react'
import axios from 'axios';

import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px'
};

const center = {
  lat: 44.77328254755136, 
  lng: 20.475249457670806
};

class MapGiver extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      marker: {
            position: center
        },
      productQuantity: this.props.productQuantity,
      productType: this.props.productType,
      token: this.props.token
    };
    this.onMapClick = this.onMapClick.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }
  async submitForm() {
    console.log('Uslo');
    
    const response = await axios.post("http://localhost:8090/givers/addProduct", 
    {
    "productType": "Plastika",
    "productQuantity": 250,
    "lat": this.state.marker.position.lat,
    "lng": this.state.marker.position.lng,
    "stateOfProduct": "open"
    },
    {
      headers: {
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNkMDg4NjdiNTVmNTBiMGZjMjFiNjQiLCJ1c2VyVHlwZSI6ImdpdmVyIiwiaWF0IjoxNjA3MjcyNTgyfQ.501Yks3GfqD8f9TkaOdUFNEzZ_PHELx4bOEh-NsPPBM`
      }
    },
    );
  }

  onMapClick = event => {
    this.setState({
      marker:{
          position:
          {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          } 
      }
    });
  };

  render () {
      if(this.state.marker){
        return (
          <>
          <h3>Izaberite lokaciju preuzimanja:</h3>
          <button onClick={this.submitForm} className="btn btn-primary" type="submit" value="Posalji">Posalji</button>
          <div className="map">
            <LoadScript
              googleMapsApiKey="AIzaSyAMBqfNf9HiDaVKKMilXtupWqc4sWebse4"
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                onClick={this.onMapClick}
              >
                { 
                  <Marker
                      position = {this.state.marker.position}
                  >
                  </Marker>
                }
              </GoogleMap>
            </LoadScript>
            </div>
            </>
          )
      } else {
        return (
            <LoadScript
              googleMapsApiKey="AIzaSyAMBqfNf9HiDaVKKMilXtupWqc4sWebse4"
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                onClick={this.onMapClick}
              >

                { /* Child components, such as markers, info windows, etc. */ 

                }
              </GoogleMap>
            </LoadScript>
          )
      }
  }
}
export default MapGiver;