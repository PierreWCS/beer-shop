import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4S9mLLlITJ4_FX0kg3ewe2gjug8ECH3Q&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap defaultZoom={10} defaultCenter={{ lat: 46.213, lng: 6.022 }}>
    {props.isMarkerShown && <Marker position={{ lat: 46.213, lng: 6.022 }} />}
  </GoogleMap>
));

export default MyMapComponent;
