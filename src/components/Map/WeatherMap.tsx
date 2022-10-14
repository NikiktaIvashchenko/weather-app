import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { ZoomControl, GeolocationControl } from '@pbe/react-yandex-maps/';
import { useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import { useCurrentWeather } from '../../utils/contexts';
import { GeolocationInfo } from '../../utils/types';
import './WeatherMap.scss'

type WeatherMapProps = {
    geopostion: GeolocationInfo;
}

function WeatherMap({ geopostion }: WeatherMapProps) {

    const { weather } = useCurrentWeather();

    return (
        <YMaps>
            <div className='map-container'>
                {(!(geopostion.latitude && geopostion.longitude && weather))
                    ? <ScaleLoader color='#8c82ff' />
                    : <Map
                        width={'100%'}
                        height={'631px'}
                        defaultState={{ center: [geopostion.latitude, geopostion.longitude], zoom: 10, controls: [] }} >
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
                        <Placemark
                            geometry={[geopostion.latitude, geopostion.longitude]}
                            properties={{
                                hintContent: `${weather.main.temp}º`,
                                balloonContent: `
                                Temp: ${weather.main.temp}º<br/>
                                Real feel:${weather.main.feels_like}º<br/>
                                ${weather.icon.description}`,
                            }}
                            modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                            options={{ openHintOnHover: true, }}
                        />
                    </Map>}
            </div>
        </YMaps >
    );
}

export default WeatherMap;