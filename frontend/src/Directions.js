import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const { Component } = require('react');


class Directions extends Component {
  constructor (props) {
    super(props)

    this.state = {
      response: null,
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
    var route1 = {
      origin: 'Gavrila Principa 48, Belgrade',
      destination: 'Gavrila Principa 48, Belgrade',
      waypoints: [
        {
          location : {
            lat: 44.77328254755136, 
            lng: 20.475249457670806 
          },
          stopover: true
        }, {
          location : {
            lat: 43.915890162587964, 
            lng: 22.345936107743636 
          },
          stopover: true
        }, {
          location : {
            lat: 43.842144488575464, 
            lng: 22.29958753837944 
          },
          stopover: true
        }, {
          location : {
            lat: 44.06828498183409, 
            lng: 22.100412144465473 
          },
          stopover: true
        }],
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
          (
            <DirectionsRenderer
              // required
              options={{ 
                directions: this.state.response
              }}
              // optional
              onLoad={directionsRenderer => {
                console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
              }}

            />
          )
        }
      </div>
    )
  }
}

export default Directions;