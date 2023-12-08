import { useRef, useState } from "react";
import { useSelector } from "react-redux/";
import { useNavigate } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import { Box, Paper, Typography, Rating, styled } from "@mui/material";
import hotelDetails from "../assests/Api Data/All_hotels.json";

// marker component
const Marker = ({ children }) => children;

// component styles
const Cluster = styled(Box)`
  color: #fff;
  background: #1978c8;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MapComponent = () => {
  const navigate = useNavigate();
  const mapRef = useRef();
  const [zoom, setZoom] = useState(10);
  const [bounds, setBounds] = useState(null);
  // retrieving data from redux slices
  const { latitude, longitude } = useSelector((state) => state.details);
  // const {places } = useSelector((state)=> state.hotels)
  const places = hotelDetails.result;
  const mapId = process.env.REACT_APP_MAPID;

  // geojson object which is called in cluster object
  const points = places.map((place) => ({
    type: "Feature",
    properties: {
      cluster: false,
      hotelId: place.hotel_id,
      hotelName: place.hotel_name,
      photo: place.main_photo_url,
      price: place.min_total_price,
      rating: place.review_score,
    },
    geometry: { type: "Point", coordinates: [place.latitude, place.longitude] },
  }));

  // get clusters
  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  return (
    <Box height="90vh" width="85vh">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={{ lat: latitude, lng: longitude }}
        zoom={10}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        options={{
          mapId: mapId,
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }}
      >
        {clusters.map((cluster) => {
          const [latitude, longitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;
          if (isCluster) {
            return (
              <Marker key={cluster.id} lat={latitude} lng={longitude}>
                <Cluster>{pointCount}</Cluster>
              </Marker>
            );
          }
          return (
            <Marker
              key={cluster.properties.hotelId}
              lat={latitude}
              lng={longitude}
            >
              <Box
                height="100px"
                width="150px"
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <Paper elevation={6} square={false}>
                  <img
                    src={cluster.properties.photo}
                    style={{ height: "100px", width: "150px" }}
                    alt="hotel"
                  />
                  <Box>
                    <Typography variant="body2" ml={1}>
                      {cluster.properties.hotelName}
                    </Typography>
                    <Rating
                      defaultValue={Number(cluster.properties.rating / 2)}
                      size="small"
                      precision={0.5}
                      readOnly
                    />
                    <Typography variant="subtitle2">
                      {((cluster.properties.price * 30) / 100).toFixed(0)}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Marker>
          );
        })}
        ;
      </GoogleMapReact>
    </Box>
  );
};

export default MapComponent;
