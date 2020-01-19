import React from "react";
import PropTypes from "prop-types";
import ForecastItem from "./../ForecastItem";
import "./../LocationList/styles.css";
import { api_key, url_forecast } from "./../../constants/api_url";
import transformForecast from "./../../services/transofrmForecast.js";

class ForecastExtended extends React.Component {
  constructor() {
    super();
    this.state = { forecastData: null };
  }

  componentDidMount() {
    this.updateCity(this.props.city);
  }

  componentDidUpdate(prevProps) {
    if (this.props.city !== prevProps.city) {
      this.setState({ forecastData: null });
      this.updateCity(this.props.city);
    }
  }

  updateCity = city => {
    const url = `${url_forecast}?q=${this.props.city}&appid=${api_key}`;
    fetch(url).then(data =>
      data.json().then(weather_data => {
        const forecastData = transformForecast(weather_data);
        this.setState({ forecastData });
      })
    );
  };
  renderForecastItemDays = forecastData => {
    return forecastData.map(forecast => (
      <ForecastItem
        weekDay={forecast.weekDay}
        hour={forecast.hour}
        key={`${forecast.weekDay}${forecast.hour}`}
        data={forecast.data}
      />
    ));
  };

  renderProgress = () => {
    return <h3>cargando pronostico...</h3>;
  };

  render() {
    const { city } = this.props;
    const { forecastData } = this.state;
    return (
      <div>
        <h2 className="forecast-title">Pronostico para {city}</h2>
        {forecastData
          ? this.renderForecastItemDays(forecastData)
          : this.renderProgress()}
      </div>
    );
  }
}

ForecastExtended.propTypes = {
  city: PropTypes.string.isRequired
};

export default ForecastExtended;
