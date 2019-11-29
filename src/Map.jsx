import React, { useEffect, useState, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

export default function Map ({ lat, lng, zoom, locations, selected }) {
  const [map, setMap] = useState(null)
  const mapContainer = useRef(null)

  const markers = useRef([])
  const renderMarkers = useRef(false)

  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibmV0LXVrLXN3ZWV0IiwiYSI6ImNrMzRmaGJqdDBpNW8zaXBqaDg2bWxqazQifQ.xVC6ifqr4x70o3xHXnASyA'
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/net-uk-sweet/ck395oc6o23271ct39ql8ph1y', // stylesheet location
        center: [lng, lat],
        zoom: zoom
      })

      map.on('load', () => {
        renderMarkers.current = true
        setMap(map)
        map.resize()
      })
    }

    if (!map) initializeMap({ setMap, mapContainer })
  }, [lat, lng, map, zoom])

  useEffect(() => {
    let combinedLocations = locations

    if (!renderMarkers.current) {
      return
    }
    if (selected) {
      combinedLocations = [selected, ...combinedLocations]
    }
    if (markers.current.length) {
      markers.current.forEach(marker => {
        marker.remove()
      })
    }
    markers.current = combinedLocations.map((location, i) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(location.name)
      const color = i > 0 && selected ? 'red' : 'blue'
      return new mapboxgl.Marker({ color })
        .setLngLat([location.lng, location.lat])
        .setPopup(popup)
        .addTo(map)
    })

    if (combinedLocations.length === 1) {
      map.flyTo({ center: locations[0] })
    }

    if (combinedLocations.length > 1) {
      const bounds = new mapboxgl.LngLatBounds()

      combinedLocations.forEach(function ({ lng, lat }) {
        bounds.extend([lng, lat])
      })

      map.fitBounds(bounds, {
        padding: 75,
        maxZoom: 15
      })
    }
  })

  return (
    <div>
      <div ref={el => (mapContainer.current = el)} className='mapContainer' />
    </div>
  )
}
