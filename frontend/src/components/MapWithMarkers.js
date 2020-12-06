import React, { Component } from 'react'
import Directions from '../Directions'


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


class MapWithMarkers extends Component {
  
  constructor (props) {
    super(props);

    this.state = {
      markers: [],
      markerList: [],
      routeCreated: [],
      directionsIndicator: false,
    };
    
    this.onMapClick = this.onMapClick.bind(this)
    this.onMarkerClicked = this.onMarkerClicked.bind(this)
    this.onPathSubmitted = this.onPathSubmitted.bind(this)
  }

  onMapClick = event => {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date()
        }
      ]
    });

    // console.log(this.state.markers);
    // console.log(this.context);
  };

  onMarkerClicked = event => {  
    // Enable/Disable markers for path creation
    var key = event.latLng.lat() + " " + event.latLng.lng();

    if(key in this.state.markerList){
      delete this.state.markerList[key];
    } else {
      this.setState({
        markerList: [
          ...this.state.markerList,
          {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          }
        ]
      });
    }
    // console.log(this.state.markerList); 
  };

  // waiting for origin from input
  // waiting for submit button
  onPathSubmitted = event => {  
    // Generate path using list of markers (nodes)
    var origin = 'Gavrila Principa 48, Belgrade';
    var waypoints = [];

    this.state.markerList.forEach(marker => {
      let val = {
        location: marker,
        stopover: true,
      }
      waypoints.push(val);
    });
    console.log('ovde brt')
    console.log(waypoints);

    // var routeCreated = {
    //   origin: origin,
    //   destination: origin,
    //   waypoints: waypoints,
    //   travelMode: 'DRIVING',
    //   optimizeWaypoints: true,
    // };

    this.setState({
      routeCreated: {
        origin: origin,
        destination: origin,
        waypoints: waypoints,
        travelMode: 'DRIVING',
        optimizeWaypoints: true,
      }
    });

    // console.log(this.state.routeCreated);
    this.setState({
      directionsIndicator: true
    });
    console.log(this.state.directionsIndicator);
  };

  render () {
    if (this.state.directionsIndicator){
      return (
        <LoadScript
          googleMapsApiKey="AIzaSyAMBqfNf9HiDaVKKMilXtupWqc4sWebse4"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onClick={this.onMapClick}
            onRightClick={this.onPathSubmitted}
          >
            { /* Child components, such as markers, info windows, etc. */ 
              this.state.markers.map((marker) => (
                <Marker
                  key={marker.time.toISOString()}
                  position={{lat: marker.lat, lng: marker.lng}}
                  onClick={this.onMarkerClicked}
                >
                </Marker>
            ))
            }
            <Directions
            optimalRouteDDD={this.state.routeCreated}/>
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
            onRightClick={this.onPathSubmitted}
          >
            { /* Child components, such as markers, info windows, etc. */ 
              this.state.markers.map((marker) => (
                <Marker
                  key={marker.time.toISOString()}
                  position={{lat: marker.lat, lng: marker.lng}}
                  onClick={this.onMarkerClicked}
                >
                </Marker>
            ))
            }
          </GoogleMap>
        </LoadScript>
      )
    }
    
  }
}
 
export default MapWithMarkers;