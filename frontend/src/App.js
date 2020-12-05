import React from 'react'
import Directions from './Directions'
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};
 
const center = {
  lat: 44.77328254755136, 
  lng: 20.475249457670806
};


function App() {
  const [markers, setMarkers] = React.useState([])
  const [map, setMap] = React.useState(null)

  const onMapClick = React.useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
       lat: event.latLng.lat(),
       lng: event.latLng.lng(),
       time: new Date()
    }]);
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAMBqfNf9HiDaVKKMilXtupWqc4sWebse4"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onClick={onMapClick}
      >
        { /* Child components, such as markers, info windows, etc. */ 
          markers.map((marker) => (
            <Marker
               key={marker.time.toISOString()}
               position={{lat: marker.lat, lng: marker.lng}}
            >
            </Marker>
         ))
        }
        <Directions/>
      </GoogleMap>
    </LoadScript>
  )
}
 
export default App;