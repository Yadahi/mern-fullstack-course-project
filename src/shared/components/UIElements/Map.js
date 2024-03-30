import React, { useEffect, useRef } from "react";
import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();
  const { center, zoom } = props;

  useEffect(() => {
    let map;

    async function initMap() {
      try {
        console.log(mapRef.current);
        const { Map } = await window.google.maps.importLibrary("maps");

        map = new Map(mapRef.current, {
          center: center,
          zoom: zoom,
        });
      } catch (error) {
        console.log(error);
      }
    }

    console.log("map", map);
    console.log(initMap());
    initMap();
    // const map = new window.google.maps.Map(mapRef.current, {
    //   center: center,
    //   zoom: zoom,
    // });

    // new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
