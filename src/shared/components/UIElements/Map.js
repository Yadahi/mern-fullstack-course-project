import React, { useEffect, useRef } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import GOOGLE_MAPS_API_KEY from "../../../config";
import "./Map.css";

const MapComponent = (props) => {
  const mapRef = useRef(null);
  const { center, zoom } = props;

  //   useEffect(() => {
  //     let map;

  //     async function initMap() {
  //       try {
  //         const { Map } = await window.google.maps.importLibrary("maps");

  //         map = new Map(mapRef.current, {
  //           center: center,
  //           zoom: zoom,
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }

  //     initMap();
  //   }, [center, zoom]);
  return (
    <div ref={mapRef} className={`map ${props.className}`} style={props.style}>
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map center={center} zoom={zoom}></Map>
      </APIProvider>
    </div>
  );
};

export default MapComponent;
