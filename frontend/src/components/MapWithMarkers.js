import React, { Component } from 'react'
import Directions from '../Directions'


import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import axios from 'axios';

// Map starting center point
const center = {
  lat: 44.77328254755136, 
  lng: 20.475249457670806
};
  

class MapWithMarkers extends Component {
  
  constructor (props) {
    super(props);

    this.state = {
      markers: [],
      markerList: [],
      routeCreated: [],
      directionsIndicator: false,
      allGarbage: [],
      markerInfo: '',
      markerListIds: []
    };
    
    this.onMapClick = this.onMapClick.bind(this)
    this.onMarkerClicked = this.onMarkerClicked.bind(this)
    this.onPathSubmitted = this.onPathSubmitted.bind(this)
    this.submitReceiverForm = this.submitReceiverForm.bind(this)
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
    let cond = false;

    this.state.markerList.forEach(elem => {
      if (elem.lat === event.latLng.lat() && elem.lng === event.latLng.lng()){
        cond = true;
      }
    });

    let key = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    // console.log(key)

    if(cond){
      const updatedMarkerList = this.state.markerList.filter(disclaimedProd => {
        if(!(disclaimedProd.lat === key.lat && disclaimedProd.lng === key.lng))
          return true;
      });
      this.setState({
        markerList: updatedMarkerList
      });
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
    // console.log(event);
    // console.log(this.state.markerList);

  };

  // waiting for origin from input
  // waiting for submit button
  async onPathSubmitted (event) {  
    // Generate path using list of markers (nodes)
    var origin = 'Fakultet organizacionih nauka, Belgrade';
    var destination = 'Fakultet organizacionih nauka, Belgrade';
    var waypoints = [];
    
    // console.log(this.state.markerList)

    this.state.markerList.forEach(marker => {
      let val = {
        location: marker,
        stopover: true,
      }
      waypoints.push(val);
    });
    // console.log('ovde brt')
    // console.log(waypoints);

    this.setState({
      routeCreated: {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: 'DRIVING',
        optimizeWaypoints: true,
      }
    });

    // console.log(this.state.routeCreated);
    this.setState({
      directionsIndicator: true
    });
    // console.log(this.state.directionsIndicator);

    // console.log(this.state.markerList);
    let markerListIdsUpdated = [];
    for (let i = 0; i < this.state.markerList.length; i++) {
      let key1 = {
        lat: this.state.markerList[i].lat, 
        lng: this.state.markerList[i].lng
      }
      for (let j = 0; j < this.state.allGarbage.length; j++) {
        let key2 = {
          lat: this.state.allGarbage[j].lat, 
          lng: this.state.allGarbage[j].lng
        }
        // console.log(key2)
        if (key1.lat == key2.lat && key1.lng == key2.lng){
          // console.log('EQUAL');
          markerListIdsUpdated.push(this.state.allGarbage[j]._id);
        }
      } 
    } 
    
    this.setState({
      markerListIds: markerListIdsUpdated
    })

    console.log(this.state.markerListIds);

    const token = sessionStorage.getItem('user-token');
    let body = {
      "products": this.state.markerListIds
    }
    const markerIds = await axios.post('http://localhost:8090/receivers/claimProducts', body, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  };

  async submitReceiverForm(e) {
    e.preventDefault();
    const token = sessionStorage.getItem('user-token');
    let body = {
      "productTypes": []
    }
    const garbage = await axios.post('http://localhost:8090/receivers/getOpenProductsByType', body, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    // console.log(garbage.data);
    this.setState({
      allGarbage: garbage.data
    })

    // this.setState({
    //   markerInfo: '50kg / \n elektromaterijal',
    // });

    // console.log(this.state.allGarbage);

    // renderMarkers();
  }

  render () {
    const style = {
      maxWidth: "100%",
      height: "550px",
      overflowX: "hidden",
      overflowY: "hidden"
    };
    const containerStyle = {
      maxWidth: "100%",
      height: "550px"
    };

    if (this.state.directionsIndicator){
      return (
        <div>
          <div className="container">
            <h2>Filtriraj rezultate:</h2>
            <h3>Sirovine</h3>
            <form onSubmit={this.submitReceiverForm} id="filter-materials">
              <div className="form-group">
                <input type="checkbox" id="metal" name="metal" value="metal"></input>
                <label htmlFor="metal">Metal</label>
              </div>
              <div className="form-group">
                <input type="checkbox" id="staklo" name="staklo" value="staklo"></input>
                <label htmlFor="staklo">Staklo</label>
              </div>
              <div className="form-group">
                <input type="checkbox" id="papir" name="papir" value="papir"></input>
                <label htmlFor="papir">Papir</label>
              </div>
              <div className="form-group">
                <input type="checkbox" id="plastika" name="plastika" value="plastika"></input>
                <label htmlFor="plastika">Plastika</label>
              </div>
              <input className="btn btn-primary" type="submit" value="Primeni"></input>
            </form>
            
            <div className="giver-locations">
              <h2>Lokacije sa donatorima sirovina: </h2>
              <h3>Oznacite lokacije sa kojih zelite da sakupite: </h3>
              <input type="submit" value="Potvrdi"></input>
              <div> Div sa mapom:</div>
            </div>

          </div>
      
          <LoadScript
            googleMapsApiKey="AIzaSyAMBqfNf9HiDaVKKMilXtupWqc4sWebse4"
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
              style={style}
              containerStyle={containerStyle}
              onClick={this.onMapClick}
              onRightClick={this.onPathSubmitted}
            >
              { /* Child components, such as markers, info windows, etc. */ 
                // this.state.markers.map((marker) => (
                //   <Marker
                //     key={marker.time.toISOString()}
                //     position={{lat: marker.lat, lng: marker.lng}}
                //     onClick={this.onMarkerClicked}
                //   >
                //   </Marker>
                // ))

                this.state.allGarbage.map((product) => 
                  {
                    const keyll = `${product.lat} ${product.lng}`;
                    const title = `${product.productType}/${product.productQuantity}kg`
                    return (
                      <Marker {...product}
                        key={keyll}
                        opacity={0.7}
                        position={{lat: product.lat, lng: product.lng}}
                        onClick={this.onMarkerClicked}
                        label={title}
                      />
                    )
                  }
                )
              }

              <Directions
              optimalRouteDDD={this.state.routeCreated}/>
            </GoogleMap>
          </LoadScript>
        </div>
      )
    } else {
      return (
        <div>
          <div className="container">
            <h2>Filtriraj rezultate:</h2>
            <h3>Sirovine</h3>
            <form onSubmit={this.submitReceiverForm} id="filter-materials">
              <div className="form-group">
                <input type="checkbox" id="metal" name="metal" value="metal"></input>
                <label htmlFor="metal">Metal</label>
              </div>
              <div className="form-group">
                <input type="checkbox" id="staklo" name="staklo" value="staklo"></input>
                <label htmlFor="staklo">Staklo</label>
              </div>
              <div className="form-group">
                <input type="checkbox" id="papir" name="papir" value="papir"></input>
                <label htmlFor="papir">Papir</label>
              </div>
              <div className="form-group">
                <input type="checkbox" id="plastika" name="plastika" value="plastika"></input>
                <label htmlFor="plastika">Plastika</label>
              </div>
              <input className="btn btn-primary" type="submit" value="Primeni"></input>
            </form>
            
            <div className="giver-locations">
              <h2>Lokacije sa donatorima sirovina: </h2>
              <h3>Oznacite lokacije sa kojih zelite da sakupite: </h3>
              <input type="submit" value="Potvrdi"></input>
              <div> Div sa mapom:</div>
            </div>
          </div>
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
              // this.state.markers.map((marker) => (
              //   <Marker
              //     key={marker.time.toISOString()}
              //     position={{lat: marker.lat, lng: marker.lng}}
              //     onClick={this.onMarkerClicked}
              //   >
              //   </Marker>
              // ))

              this.state.allGarbage.map((product) => 
                {
                  const keyll = `${product.lat} ${product.lng}`;
                  const title = `${product.productType}/${product.productQuantity}kg`
                  return (
                    <Marker {...product}
                      key={keyll}
                      opacity={1}
                      position={{lat: product.lat, lng: product.lng}}
                      onClick={this.onMarkerClicked}
                      label={title}
                    />
                  )
                }
              )
            
            }
          </GoogleMap>
        </LoadScript>
      </div>
      )
    }
    
  }
}
 
export default MapWithMarkers;