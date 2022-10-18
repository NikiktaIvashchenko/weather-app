import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useGeolocation } from './utils/hooks/useGeolocation';
import { Container, Row } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';

import './App.scss';

import Header from './components/Header/Header';
import Tabs from './components/Tabs/Tabs';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

import WidgetsFrame from './components/WidgetsFrame/WidgetsFrame';
import WeatherMap from './components/Map/WeatherMapBlock';

import { setGeolocation } from './utils/redux/slices/geoSlice';
import { useAppDispatch, useAppSelector } from './utils/redux/hooks';
import { changeType } from './utils/redux/slices/dataTypeSlice';
import { ActiveDataType } from './utils/types';
const axios = require('axios').default

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function App() {

  let geoInfo = useGeolocation();

  const geolocation = useAppSelector(state => state.geolocation.value);
  const activeType = useAppSelector(state => state.datatype.activeType);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setGeolocation(geoInfo))
  }, [geoInfo.name])

  return (
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
            <Tabs onClick={() => dispatch(changeType(
              activeType === ActiveDataType.WeatherForecast
                ? ActiveDataType.AirQuality
                : ActiveDataType.WeatherForecast
            ))} />
          </div>
          <Outlet />
          <WeatherMap />
        </div>
        <div className='sidebar col-3'>
          <WidgetsFrame classNames={['chart-container']}>
            <div className='title'>UV Index</div>
            <img className='uv_chart' src={require('./assets/icons/Chart.svg').default} />
            <div className='sub-info' id='uv_index'>
              <div className='current-info'>
                <span className='value'>{4.20}</span>
                <span className='units'> UV</span>
              </div>
            </div>
            <span className='chart-container__background_center blue'></span>
          </WidgetsFrame>
        </div>
      </Row>
    </div>
  );
}

export default App;
