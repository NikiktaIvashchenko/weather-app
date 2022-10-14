import WidgetsFrame from '../../components/WidgetsFrame/WidgetsFrame';
import './DaysPage.scss'

import DayFrame from '../../components/DayFrame/DayFrame';

import { useEffect, useMemo, useState } from 'react';
import { WeatherForecast } from '../../utils/classes';
import { IWeatherForecast } from '../../utils/types';
import Clock from '../../components/Clock/Clock';
import { ScaleLoader } from 'react-spinners';
import { CurrentWeatherContext, useCurrentWeather, useGeo, useWeatherForecast } from '../../utils/contexts';

const axios = require('axios').default;

function DaysPage() {

    const { info } = useGeo();

    const { forecast, setWeatherForecast } = useWeatherForecast();
    const { weather: currentWeather, setCurrentWeather } = useCurrentWeather();

    useMemo(() => {
        if (info?.cityName === '') return;
        axios.get(`${process.env.REACT_APP_WEATHER_API_LINK}/weather?q=${info?.cityName}&appid=${process.env.REACT_APP_WEATHER_API}`)
            .then(({ data }: { data: IWeatherForecast }) => new WeatherForecast(data))
            .then((currentWeather: WeatherForecast) => setCurrentWeather(currentWeather));
    }, [info?.cityName])

    useEffect(() => {
        if (currentWeather) {
            axios.get(`${process.env.REACT_APP_WEATHER_API_LINK}/forecast?q=${info?.cityName}&appid=${process.env.REACT_APP_WEATHER_API}&cnt=37`)
                .then(
                    ({ data }: any) => {
                        return data.list.map((item: IWeatherForecast) => new WeatherForecast(item));
                    })
                .then((list: WeatherForecast[]) => {
                    setWeatherForecast(list.filter((item) => item.time === 15 && currentWeather.longDay !== item.longDay));
                });
        }
    }, [currentWeather])

    return (
        <div className="days-forecast">
            {(!currentWeather)
                ? <ScaleLoader color='#8c82ff' />
                : <WidgetsFrame classNames={['today-frame', 'col-3']}>
                    <div className="today-content">
                        <div className='title'>
                            <span className='title__item'>{
                                currentWeather?.longDay
                            }</span>
                            <Clock classNames={['title__item']} />
                        </div>
                        <div className="content">
                            <span className='content__item-temperature'>
                                {currentWeather?.main.temp}º
                            </span>
                            <img
                                alt="todays weather"
                                className='content__icon' />
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
                </WidgetsFrame >}
            <div className="next-days">
                {forecast?.map((item, index) => {
                    return <DayFrame
                        dayName={item.shortDay}
                        weatherIcon={'/icons/dark-theme.svg'}
                        temperature={item.main.temp}
                        key={index} />
                })}

            </div>
        </div>
    );
}

export default DaysPage;