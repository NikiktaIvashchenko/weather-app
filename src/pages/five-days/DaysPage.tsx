import WidgetsFrame from '../../components/WidgetsFrame/WidgetsFrame';
import './DaysPage.scss'

import DayFrame from '../../components/DayFrame/DayFrame';

import { useEffect, useMemo, useState } from 'react';
import { WeatherForecast } from '../../utils/classes';
import { ActiveDataType, IAirQuality, IWeatherForecast } from '../../utils/types';
import { ScaleLoader } from 'react-spinners';
import { useAppSelector } from '../../utils/redux/hooks';
import { useGetAirQualityQuery, useGetCurrentWeatherQuery, useGetWeatherForecastQuery } from '../../utils/redux/api/weatherApi';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import AirQualityFrame from '../../components/AirQualityFrame/AirQualityFrame';

const axios = require('axios').default;

function DaysPage() {

    // const [time, setTime] = useState<string>('');
    const [currentWeather, setCurrentWeather] = useState<WeatherForecast>();
    const [weatherForecast, setWeatherForecast] = useState<WeatherForecast[]>();
    const [airQuality, setAirQuality] = useState<IAirQuality[]>();

    const geolocation = useAppSelector(state => state.geolocation.value);
    const activeType = useAppSelector(state => state.datatype.activeType);

    const currentWeatherQuery = useGetCurrentWeatherQuery(geolocation.name ?? skipToken);
    const weatherForecastQuery = useGetWeatherForecastQuery(geolocation.name ?? skipToken);
    const airQualityQuery = useGetAirQualityQuery({ lat: geolocation.lat, lon: geolocation.lon } ?? skipToken);

    useMemo(() => {
        if (currentWeatherQuery.data) setCurrentWeather(new WeatherForecast(currentWeatherQuery.data));
    }, [currentWeatherQuery.data])

    useMemo(() => {
        if (weatherForecastQuery.data) {
            let forecast = weatherForecastQuery.data
                .map((item) => new WeatherForecast(item))
                .filter((item) => item.time === 15 && currentWeather?.longDay !== item.longDay);

            setWeatherForecast((forecast.length > 4) ? forecast.splice(0, 4) : forecast);
        }
    }, [weatherForecastQuery.data])

    useMemo(() => {
        if (airQualityQuery.data) {
            setAirQuality(airQualityQuery.data.filter((item) => {
                let date = new Date(item.dt * 1000)
                if (date.getHours() === 15)
                    return item;
            }))
        }
    }, [airQualityQuery.data])


    useEffect(() => {
        console.log(airQuality);
    }, [airQuality])


    return (
        (currentWeatherQuery.isLoading ||
            weatherForecastQuery.isLoading ||
            airQualityQuery.isLoading ||
            currentWeatherQuery.isFetching ||
            weatherForecastQuery.isFetching ||
            airQualityQuery.isFetching)
            ? <ScaleLoader color='#8c82ff' />
            : (activeType === ActiveDataType.AirQuality)
                ? <div className='air-quality-forecast'>
                    {airQuality?.map((item, index) => {
                        return (
                            <AirQualityFrame item={item} key={index} classNames={['air-quality-item']} />
                        )
                    })}
                </div>
                : <div className="days-forecast">
                    <WidgetsFrame classNames={['today-frame', 'col-3']}>
                        <div className="today-content">
                            <div className='title'>
                                <span className='title__item'>{
                                    currentWeather?.longDay
                                }</span>
                                {/* <span className={'title__item'}>{time}</span> */}
                            </div>
                            <div className="content">
                                <span className='content__item-temperature'>
                                    {currentWeather?.main.temp}
                                </span>
                                <img
                                    alt="todays weather"
                                    className='content__icon'
                                    src={currentWeather?.icon.icon} />
                                <div className='sub-info'>
                                    <span className='sub-info__item'>Real Feel
                                        &#8203;{currentWeather?.main.feels_like}º
                                    </span>
                                    <span className='sub-info__item'>
                                        Wind: {currentWeather?.wind.getCardinalDirection(currentWeather?.wind.deg)},
                                        &#8203;
                                        {currentWeather?.wind.getKPHSpeed(currentWeather?.wind.speed)} km/h
                                    </span>
                                    <div className='items-container'>
                                        <span className='sub-info__item'>Pressure:
                                            {currentWeather?.main.pressure}MB
                                        </span>
                                        <span className='sub-info__item'>Humidity:
                                            {currentWeather?.main.humidity}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span className='today-frame__background-color' id='purple'></span>
                        <span className='today-frame__background-color' id='light-blue'></span>
                        <span className='today-frame__background-color' id='blue'></span>
                    </WidgetsFrame >
                    <div className="next-days">
                        {weatherForecast?.map((item, index) => {
                            return <DayFrame
                                dayName={item.shortDay}
                                weatherIcon={item.icon.icon}
                                temperature={item.main.temp}
                                key={index} />
                        })}
                    </div>
                </div>
    );
}

export default DaysPage;