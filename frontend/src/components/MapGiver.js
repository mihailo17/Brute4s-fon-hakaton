import React, { Component } from 'react'

import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api';


const containerStyle = {
  width: '100vw',
  height: '100vh'
};

// Map starting center point
const center = {
  lat: 44.77328254755136, 
  lng: 20.475249457670806
};
  
// Path nodes
// var markerList = {};
// var routeCreated = {}


class MapGiver extends Component {
  
  constructor (props) {
    super(props);

    this.state = {
      marker: {
            position: center
        },
    };
    
    this.onMapClick = this.onMapClick.bind(this)
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

    // console.log(this.state.markers);
    // console.log(this.context);
  };

  render () {
      if(this.state.marker){
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
                    <Marker
                        position = {this.state.marker.position}
                    >
                    </Marker>
                }
              </GoogleMap>
            </LoadScript>
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