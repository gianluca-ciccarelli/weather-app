import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import "./App.css";
import LocationList from "./components/LocationList/LocationList.js";
import ForecastExtended from "./components/ForecastExtended/ForecastExtended.js";
import { store } from "./store";
import { setCity } from "./actions";

const cities = [
  "Buenos Aires",
  "Bogota",
  "Barcelona",
  "Mexico",
  "Montevideo",
  "Santiago",
  "Washington",
  "Madrid",
  "Lima"
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: null
    };
  }

  handleSelectedLocation = city => {
    this.setState({ city });

    store.dispatch(setCity(city));
  };

  render() {
    const { city } = this.state;
    return (
      <Grid>
        <Row>
          <AppBar position="sticky">
            <Toolbar>
              <Typography color="inherit">Weather-App</Typography>
            </Toolbar>
          </AppBar>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <LocationList
              cities={cities}
              onSelectedLocation={this.handleSelectedLocation}
            />
          </Col>
          <Col xs={12} md={6}>
            <Paper zdepth={4}>
              <div className="details">
                {city === null ? null : <ForecastExtended city={city} />}
              </div>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
