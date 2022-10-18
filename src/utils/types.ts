import { WeatherForecast } from "./classes"

export enum ActiveDataType {
    AirQuality,
    WeatherForecast
}

export enum Theme {
    Light,
    Dark
}

export type GeolocationInfo = {
    name: string,
    lat: number,
    lon: number,
    country?: string,
    state?: string,
}

export interface IAirQuality {
    components: {
        co: number,
        no: number,
        no2: number,
        o3: number,
        so2: number,
        pm2_5: number,
        pm10: number,
        nh3: number
    }
    dt: number;
}

export interface IUVIndex {
    uv: number;
    uv_max: number;
}

export interface ISysData {
    country: string;
    sunrise: number;
    sunset: number;
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
    coord: {
        lon: number,
        lat: number
    };
    dt: number;
    main: IMainForecast;
    weather: IWeatherIcon[];
    wind: IWindData;
    name: string;
    sys: ISysData;
}
