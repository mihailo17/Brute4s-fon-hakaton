import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
 
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
        zoom={19}
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
        <></>
      </GoogleMap>
    </LoadScript>
  )
}
 
export default App;