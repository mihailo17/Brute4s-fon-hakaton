import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
 
const containerStyle = {
  width: '100vw',
  height: '100vh'
};
 
const center = {
  lat: 44.77328254755136, 
  lng: 20.475249457670806
};
 
function App() {
  const [map, setMap] = React.useState(null)

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAMBqfNf9HiDaVKKMilXtupWqc4sWebse4"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={19}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}
 
export default App;