import { HTMLAttributes } from "react";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Box } from "@mui/material";
import { MAPBOX_ACCESS_TOKEN } from "../../constants";

interface IUserLocationMap extends HTMLAttributes<HTMLDivElement> {
  location: { longitude: number; latitude: number };
}

function UserLocationMap({ location }: IUserLocationMap) {
  return (
    <Box>
      <Map
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          ...location,
          zoom: 1.5,
        }}
        style={{ height: "300px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        <Marker longitude={location.longitude} latitude={location.latitude} />
      </Map>
    </Box>
  );
}

export default UserLocationMap;
