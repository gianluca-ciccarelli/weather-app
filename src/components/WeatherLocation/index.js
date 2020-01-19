import React from "react";
import PropTypes from "prop-types";
import CircularProgeress from "@material-ui/core/CircularProgress";
import transformWeather from "./../../services/transformWeather.js";
import Location from "./Location/Location.js";
import WeatherData from "./WeatherData/index.js";
import "./styles.css";
import getUrlWeatherByCity from "./../../services/getUrlWeatherByCity";

class WeatherLocation extends React.Component {
  constructor(props) {
    super(props);
    const { city } = props;
    this.state = {
      city,
      data: null
    };
  }

  componentDidMount() {
    this.handleUpdateClick();
  }

  componentDidUpdate(prevProps, prevState) {}

  handleUpdateClick = () => {
    const api_weather = getUrlWeatherByCity(this.state.city);

    fetch(api_weather)
      .then(resolve => {
        return resolve.json();
      })
      .then(data => {
        const newWeather = transformWeather(data);
        this.setState({
          data: newWeather
        });
      });
  };

  render() {
    const { onWeatherLocationClick } = this.props;
    const { city, data } = this.state;
    return (
      <div className="weatherLocationCont" onClick={onWeatherLocationClick}>
        <Location city={city} />
        {data ? <WeatherData data={data} /> : <CircularProgeress size={50} />}
        {/* <button onClick={this.handleUpdateClick}>Actualizar</button> */}
      </div>
    );
  }
}
WeatherLocation.propTypes = {
  city: PropTypes.string.isRequired,
  onWeatherLocationClick: PropTypes.func
};
export default WeatherLocation;
