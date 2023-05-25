import React from 'react';
import { markerdata } from "../data/markerData";

const CenterInfo = () => {
  return (
    <div>
      {markerdata.foreach((marker) => (
        <div key={marker.title}>
          <h3>{marker.title}</h3>
          <p>Latitude: {marker.lat}</p>
          <p>Longitude: {marker.lng}</p>
        </div>
      ))}
    </div>
  );
};

export default CenterInfo;

