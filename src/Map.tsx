import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";

import { ResultType } from "./types";
import { isMunro } from "./utils";

interface Props {
  lat: number;
  lng: number;
  zoom: number;
  locations: ResultType[];
  selected?: ResultType;
  onLocationClick: (item: ResultType) => void;
}

export default function Map({
  lat,
  lng,
  zoom,
  locations,
  selected,
  onLocationClick
}: Props) {
  const [map, setMap] = useState(null);
  const mapContainer: any = useRef(null);

  const markers: any = useRef([]);
  const renderMarkers = useRef(false);

  const handleClick = (location: ResultType) => () => {
    if (!selected) {
      onLocationClick(location);
    }
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibmV0LXVrLXN3ZWV0IiwiYSI6ImNrMzRmaGJqdDBpNW8zaXBqaDg2bWxqazQifQ.xVC6ifqr4x70o3xHXnASyA";
    const initializeMap = ({ setMap, mapContainer }: any) => {
      const map: any = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/net-uk-sweet/ck395oc6o23271ct39ql8ph1y", // stylesheet location
        center: [lng, lat],
        zoom: zoom
      });

      map.on("load", () => {
        renderMarkers.current = true;
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [lat, lng, map, zoom]);

  useEffect(() => {
    let combinedLocations = locations;

    if (!renderMarkers.current) {
      return;
    }
    if (selected) {
      combinedLocations = [selected, ...combinedLocations];
    }
    if (markers.current.length) {
      markers.current.forEach((marker: any) => {
        marker.remove();
      });
    }
    markers.current = combinedLocations.map((location, i) => {
      const popup = new mapboxgl.Popup({ offset: [-15, -15] }).setText(
        location.name
      );

      const el = document.createElement("div");
      el.innerHTML = isMunro(location) ? "&#9650" : "&#x2302";
      el.style.fontSize = isMunro(location) ? "25px" : "35px";
      el.style.color = i === 0 && selected ? "red" : "black";
      el.addEventListener("click", handleClick(location));

      return new mapboxgl.Marker(el, { offset: [-15, -15] })
        .setLngLat([location.lng, location.lat])
        .setPopup(popup)
        .addTo(map as any);
    });

    if (combinedLocations.length === 1) {
      (map as any).flyTo({ center: locations[0] });
    }

    if (combinedLocations.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();

      combinedLocations.forEach(function({ lng, lat }) {
        bounds.extend([lng, lat] as any);
      });

      (map as any).fitBounds(bounds, {
        padding: 75,
        maxZoom: 15
      });
    }
  });

  return (
    <div>
      <div ref={el => (mapContainer.current = el)} className="mapContainer" />
    </div>
  );
}
