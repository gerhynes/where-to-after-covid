import React from "react";
import { Helmet } from "react-helmet";
import { Marker, Popup } from "react-leaflet";

import Layout from "components/Layout";
import Container from "components/Container";
import Map from "components/Map";
import Snippet from "components/Snippet";
import { useDestinations } from "hooks";

const LOCATION = {
  lat: 53.4239,
  lng: -7.9407
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 5;

const IndexPage = () => {
  const { destinations } = useDestinations();

  async function mapEffect({ leafletElement: map } = {}) {
    if (!map) return;
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
    mapEffect
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Where to after Covid?</title>
      </Helmet>

      <Map {...mapSettings}>
        {destinations.map((destination) => {
          const { id, name, location } = destination;
          const position = [location.latitude, location.longitude];
          return (
            <Marker key={id} position={position}>
              <Popup>{name}</Popup>
            </Marker>
          );
        })}
      </Map>

      <Container type="content" className="text-center home-start">
        <h2>My Destinations</h2>
        <ul>
          {destinations.map((destination) => {
            const { id, name } = destination;
            return <li key={id}>{name}</li>;
          })}
        </ul>
        <h3>
          Data managed using <a href="https://graphcms.com/">GraphCMS</a>
        </h3>
      </Container>
    </Layout>
  );
};

export default IndexPage;
