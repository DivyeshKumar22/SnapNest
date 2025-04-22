import React, { useRef, useEffect } from 'react';
import 'ol/ol.css'; // Import OpenLayers CSS
import { Map as OlMap, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

import './Map.css';

const Map = props => {
  const mapRef = useRef();

  // ✅ Destructure lat, lng, zoom early to use in dependencies
  const { center, zoom } = props;
  const { lat, lng } = center;

  useEffect(() => {
    const map = new OlMap({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([lng, lat]),
        zoom: zoom,
      }),
    });

    return () => map.setTarget(null); // cleanup
  }, [lat, lng, zoom]); // ✅ Warning fixed by using direct dependencies

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
