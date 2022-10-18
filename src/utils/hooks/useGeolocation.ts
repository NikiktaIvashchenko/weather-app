import { AxiosError } from "axios";
import { useEffect, useState, useMemo } from "react";
import { GeolocationInfo } from "../types";

const axios = require('axios').default

export function useGeolocation(): GeolocationInfo {
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [cityName, setCityName] = useState<string>('');
    const [country, setCountry] = useState<string>('');

    useMemo(() => {
        axios.get(`${process.env.REACT_APP_GEOLOCATION_LINK}?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API}`)
            .then(
                ({ data }: { data: GeolocationInfo[] }) => {
                    if (data.length !== 0) {
                        setCityName(`${data[0].name}`)
                        setCountry(`${data[0].country}`);
                    }
                },

                ({ error }: any) => {
                    setCityName(`${error.message}`)
                }
            );
    }, [latitude, longitude])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
            setLongitude(position.coords.longitude);
            setLatitude(position.coords.latitude);
        }, (error: GeolocationPositionError) => {
            console.log(error.message)
            setLongitude(37.618423);
            setLatitude(55.751244)
        },
            {
                enableHighAccuracy: true,
                timeout: 1000,
                maximumAge: 0,
            }
        );
    }, [])

    return {
        name: cityName,
        lat: latitude,
        lon: longitude,
        country: country
    }
}