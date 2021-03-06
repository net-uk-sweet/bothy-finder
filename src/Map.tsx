import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { Maybe, ResultType, Munro } from "./types";
import { isMunro } from "./utils";
import Marker from "./Marker";
import SimpleCard from "./SimpleCard";

const useStyles = makeStyles(() =>
  createStyles({
    mapContainer: {
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      margin: 0
    }
  })
);

interface MapProps {
  lat: number;
  lng: number;
  zoom: number;
  locations: ResultType[];
  selected: Maybe<ResultType>;
  onLoad(): void;
}

export default function Map({
  lat,
  lng,
  zoom,
  locations,
  selected,
  onLoad
}: MapProps) {
  const classes = useStyles();

  const [map, setMap] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const mapContainer: any = useRef(null);

  const markers: any = useRef([]);
  const renderMarkers = useRef(false);

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
        setLoaded(true);
        onLoad();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [lat, lng, map, zoom, onLoad]);

  useEffect(() => {
    let combinedLocations = locations;

    if (selected) {
      combinedLocations = [selected, ...combinedLocations];
    }
    if (markers.current.length) {
      markers.current.forEach((marker: any) => {
        marker.remove();
      });
    }
    markers.current = combinedLocations.map((location, i) => {
      const popupEl = document.createElement("div");
      const card = (
        <SimpleCard
          name={location.name}
          grid={location.grid}
          height={isMunro(location) ? (location as Munro).height : undefined}
          url={location.url}
          selected={true}
          onClick={() => {}}
        />
      );

      ReactDOM.render(card, popupEl);

      const popup = new mapboxgl.Popup({
        offset: {
          top: [-10, 0],
          right: [-30, -20],
          bottom: [-10, -35],
          left: [10, -20]
        },
        closeButton: false,
        maxWidth: "none"
      }).setDOMContent(popupEl);

      const el = document.createElement("div");
      ReactDOM.render(<Marker location={location} selected={i === 0} />, el);

      return new mapboxgl.Marker(el, { offset: [-10, -15] })
        .setLngLat([location.lng, location.lat])
        .setPopup(popup)
        .addTo(map as any);
    });

    if (combinedLocations.length === 1) {
      (map as any).flyTo({ center: combinedLocations[0] });
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
    <div
      ref={el => (mapContainer.current = el)}
      className={`${classes.mapContainer} ${loaded ? "mapbox-loaded" : ""}`}
    />
  );
}
