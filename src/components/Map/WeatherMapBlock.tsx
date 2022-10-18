import { YMaps, Map, Placemark, FullscreenControl } from '@pbe/react-yandex-maps';
import { ZoomControl, GeolocationControl } from '@pbe/react-yandex-maps/';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import { WeatherForecast } from '../../utils/classes';
import { useGetCurrentWeatherQuery } from '../../utils/redux/api/weatherApi';
import { useAppSelector } from '../../utils/redux/hooks';
import { GeolocationInfo } from '../../utils/types';
import Button from '../Button/Button';
import './WeatherMap.scss'

function WeatherMap() {


    const geopostion = useAppSelector(state => state.geolocation.value);
    const { data, error, isLoading, isFetching } = useGetCurrentWeatherQuery(geopostion.name ?? skipToken)
    const [weather, setWeather] = useState<WeatherForecast>();

    useMemo(() => {
        if (data) setWeather(new WeatherForecast(data))
    }, [data])

    const mapRef = useRef<any>();

    return (
        <div className="map-section">
            <div className="section-title">
                <span>Global Map</span>
                <Button classNames={['map-section__button-do-wide']} onClick={() => console.log(mapRef.current.control)}>
                    <span>View wide</span>
                    <img src={require('../../assets/icons/Stars.svg').default} />
                </Button>
            </div>
            {isLoading || isFetching ? <ScaleLoader color='#8c82ff' />
                :
                <YMaps >
                    <div className='map-container'>
                        <Map instanceRef={mapRef}
                            width={'100%'}
                            height={'631px'}
                            state={{ center: [geopostion.lat, geopostion.lon], zoom: 10, controls: [] }} >
                            <GeolocationControl options={{
                                float: 'right',
                                position: {
                                    top: '30px',
                                    right: '10px'
                                },
                            }} />
                            <ZoomControl options={{
                                position: {
                                    top: '200px',
                                    right: '10px',
                                }
                            }} />
                            <FullscreenControl />
                            <Placemark
                                geometry={[geopostion.lat, geopostion.lon]}
                                properties={{
                                    hintContent: `${weather?.main.temp}º`,
                                    balloonContent: `
                                Temp: ${weather?.main.temp}º<br/>
                                Real feel:${weather?.main.feels_like}º<br/>
                                ${weather?.icon.description}`,
                                }}
                                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                options={{ openHintOnHover: true, }}
                            />
                        </Map>
                    </div>
                </YMaps >}
        </div>
    );
}

export default WeatherMap;