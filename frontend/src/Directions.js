import React, { Component } from 'react'
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';


// Optimal path detection using Google Routes API
class Directions extends Component {

  constructor (props) {
    super(props)

    this.state = {
      response: null,
      optimalRoute: this.props.optimalRouteDDD
    }

    this.directionsCallback = this.directionsCallback.bind(this)
  }

  directionsCallback (response) {    
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(
          () => ({
            response
          })
        )
      } else {
        console.log('response: ', response)    
      }
    }
  }

  render () {
    let waypoints = this.state.optimalRoute.waypoints;
    var route1 = {
      // origin: 'Gavrila Principa 48, Belgrade',
      // destination: 'Gavrila Principa 48, Belgrade',
      origin: this.state.optimalRoute.origin,
      destination: this.state.optimalRoute.destination,
      waypoints: this.state.optimalRoute.waypoints,
      travelMode: 'DRIVING',
      optimizeWaypoints: true,
    }
    
    return (
      <div className="directionsHandling">
        {
          <DirectionsService
            // required
            options={{ 
              destination: route1.destination,
              origin: route1.origin,
              travelMode: route1.travelMode,
              waypoints: route1.waypoints,
              optimizeWaypoints: route1.optimizeWaypoints
            }}
            // required
            callback={this.directionsCallback}
          />
        }

        {
          this.state.response !== null &&
          (
            <DirectionsRenderer
              // required
              options={{
                directions: this.state.response
              }}
              // optional
              onLoad={directionsRenderer => {
                console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer);
              }}

            />
          )
        }
      </div>
    )   
  }
}

export default Directions;