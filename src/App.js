import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl';
import Data from './Data.json'
import Input from './Components/Input'
import MapStyle from './Components/MapStyle'
import logo from './mapIcon.png'

mapboxgl.accessToken = 'pk.eyJ1IjoiLXByYWthc2gtLWd1cHRhIiwiYSI6ImNrbWo2dHVxaTAxdDUydnBsaHM4ZWg3cDEifQ.zR6DMydjo_qUujvIGz7RLg';

function App() {

  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(76.786232);
  const [lat, setLat] = useState(20.667767);
  const [zoom, setZoom] = useState(4);
  const [categoryVal, setCategoryVal] = useState(1);
  const [placeVal, setPlaceVal] = useState(1);
  const [mapStyle, setMapStyle] = useState([{ Satellite: false }, { Light: false }, { Dark: false }, { Streets: true }, { Outdoors: false }]);

  useEffect(() => {
    if (map.current)
      return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current)
      return;
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const onChangeCategoryHandler = event => {
    setCategoryVal(event.target.value);
  }
  const onChangePlaceHandler = event => {
    setPlaceVal(event.target.value);
  }

  const searchBtnHandler = () => {
    map.current.flyTo({ center: [Data.data[categoryVal - 1].places[placeVal - 1].longitude, Data.data[categoryVal - 1].places[placeVal - 1].latitude], zoom: 13 });
  }

  const changeMapStyleHandler = (event) => {
    const mapStyleCopy = [...mapStyle]
    mapStyleCopy[0].Satellite = false
    mapStyleCopy[1].Light = false;
    mapStyleCopy[2].Dark = false;
    mapStyleCopy[3].Streets = false;
    mapStyleCopy[4].Outdoors = false;

    switch (event.target.value) {
      case 'Satellite':
        mapStyleCopy[0].Satellite = true;
        map.current.setStyle('mapbox://styles/mapbox/satellite-v9');
        break;
      case 'Light':
        mapStyleCopy[1].Light = true;
        map.current.setStyle('mapbox://styles/mapbox/light-v10');
        break;
      case 'Dark':
        mapStyleCopy[2].Dark = true;
        map.current.setStyle('mapbox://styles/mapbox/dark-v10');
        break;
      case 'Streets':
        mapStyleCopy[3].Streets = true;
        map.current.setStyle('mapbox://styles/mapbox/streets-v11');
        break;
      case 'Outdoors':
        mapStyleCopy[4].Outdoors = true;
        map.current.setStyle('mapbox://styles/mapbox/outdoors-v11');
        break;
      default: break;
    }
    setMapStyle(mapStyleCopy)
  }

  const [showLatLng, setShowLatLng] = useState(true)
  const showMapStyleOption=()=>{
    setShowLatLng(!showLatLng)
  }

  const blackColor ={
    color:'black'
  }
  const redColor ={
    color:'#6e6b6b'
  }

  return (
    <div className="container">

      <div className="landingPage">
        <img src={logo} alt="logo"></img>
        <h3>Destofin</h3>
        <p>Locate your way. Locate with ease.</p>
      </div>
      <i style={showLatLng? blackColor : redColor} onClick={showMapStyleOption} className="fas fa-map styleIcon"></i>
      {
         showLatLng ?
          <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          :
          <div className="mapStyleContainer">
            <span>Map Style:</span>
            <MapStyle changeStyle={(event) => changeMapStyleHandler(event)} option='Satellite' name='map_style' defaultStyle={mapStyle[0].Satellite} />
            <MapStyle changeStyle={(event) => changeMapStyleHandler(event)} option='Light' name='map_style' defaultStyle={mapStyle[1].Light} />
            <MapStyle changeStyle={(event) => changeMapStyleHandler(event)} option='Dark' name='map_style' defaultStyle={mapStyle[2].Dark} />
            <MapStyle changeStyle={(event) => changeMapStyleHandler(event)} option='Streets' name='map_style' defaultStyle={mapStyle[3].Streets} />
            <MapStyle changeStyle={(event) => changeMapStyleHandler(event)} option='Outdoors' name='map_style' defaultStyle={mapStyle[4].Outdoors} />
          </div>
      }
      <div className="inputDataContainer">
        <Input data={Data.data} categoryVal={(event) => onChangeCategoryHandler(event)} />
        <Input data={Data.data[categoryVal - 1].places} categoryVal={(event) => onChangePlaceHandler(event)} />
        <button onClick={searchBtnHandler} className="btn">Search<i className="fas fa-search"></i></button>
      </div>

      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;
