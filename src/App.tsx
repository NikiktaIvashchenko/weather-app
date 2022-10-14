import React, { useEffect, useState } from 'react';
import { useGeolocation } from './utils/hooks/useGeolocation';
import { Container, Row } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';

import './App.scss';

import Header from './components/Header/Header';
import Tabs from './components/Tabs/Tabs';

import WidgetsFrame from './components/WidgetsFrame/WidgetsFrame';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { GeolocationInfo } from './utils/types';
import WeatherMap from './components/Map/WeatherMap';
import Button from './components/Button/Button';
import { GeoContext, CurrentWeatherContext, WeatherForecastContext } from './utils/contexts';
import { WeatherForecast } from './utils/classes';

function App() {

  let geolocation = useGeolocation();

  const [geoInfo, setGeoInfo] = useState<GeolocationInfo>(geolocation);
  const [currentWeather, setCurrentWeather] = useState<WeatherForecast>();
  const [forecast, setWeatherForecast] = useState<WeatherForecast[]>();

  useEffect(() => {
    setGeoInfo(geolocation);
  }, [geolocation.cityName])

  return (
    <GeoContext.Provider value={{ info: geoInfo, setInfo: setGeoInfo }}>
      <CurrentWeatherContext.Provider value={{ weather: currentWeather, setCurrentWeather }}>
        <WeatherForecastContext.Provider value={{ forecast, setWeatherForecast }}>
          <div className="App">
            <Header />
            <Row className='content'>
              <div className="main col-9">
                <div className="main__header">
                  <ul className="forecast-period-list">
                    <li className='forecast-period-list__item'>
                      <NavLink to='/today'>Today</NavLink>
                    </li>
                    <li className='forecast-period-list__item'>
                      <NavLink to='/tommorow'>Tommorow</NavLink>
                    </li>
                    <li className='forecast-period-list__item'>
                      <NavLink to='/days'>Next 5 Days</NavLink>
                    </li>
                  </ul>
                  <Tabs />
                </div>
                <Outlet />
                <div className="map-section">
                  <div className="section-title">
                    <span>Global Map</span>
                    <Button classNames={['map-section__button-do-wide']}>
                      <span>View wide</span>
                      <img src={require('./assets/icons/Stars.svg').default} />
                    </Button>
                  </div>
                  <WeatherMap geopostion={geoInfo} />
                </div>
              </div>
              <div className='sidebar col-3'>
                <WidgetsFrame classNames={['temperature-chart']}>
                  { }
                </WidgetsFrame>
              </div>
            </Row>
          </div>
        </WeatherForecastContext.Provider>
      </CurrentWeatherContext.Provider>
    </GeoContext.Provider>
  );
}

export default App;
