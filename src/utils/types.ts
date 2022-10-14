import { WeatherForecast } from "./classes"

export type GeolocationInfo = {
    cityName: string,
    latitude: number,
    longitude: number
}

export type GeoContextType = {
    info?: GeolocationInfo,
    setInfo: (info: GeolocationInfo) => void;
}

export type CurrentWeatherContextType = {
    weather?: WeatherForecast,
    setCurrentWeather: (weather: WeatherForecast) => void;
}

export type WeatherForecastContextType = {
    forecast?: WeatherForecast[],
    setWeatherForecast: (forecast: WeatherForecast[]) => void;
}

export type CitiesApiOptions = {
    method: string;
    url: string;
    params: {
        limit: string,
        skip: string,
        q: string,
        type: string
    },
    headers: {
        'X-RapidAPI-Key': string,
        'X-RapidAPI-Host': string
    }
}

export interface ICity {
    coordinates: {
        latitude: number,
        longitude: number,
    },
    country: { id: string },
    name: string
}

export type CitiesResponse = {
    data: Array<ICity>;
}

export interface IMainForecast {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

export interface IWindData {
    speed: number;
    deg: number;
    gust: number;
}

export interface IWeatherIcon {
    id: number;
    main: string;
    description: string;
    icon: string;
}


export interface IWeatherForecast {
    dt: number;
    main: IMainForecast;
    weather: IWeatherIcon[];
    wind: IWindData;
}
