import { createContext, useContext } from "react";
import { CurrentWeatherContextType, GeoContextType, WeatherForecastContextType } from "./types";

export const GeoContext = createContext<GeoContextType>({ setInfo: (info) => { throw new Error('Provider not found') } });
export const useGeo = () => useContext(GeoContext);

export const CurrentWeatherContext = createContext<CurrentWeatherContextType>({ setCurrentWeather: (weather) => { throw new Error('Provider not found') } });
export const useCurrentWeather = () => useContext(CurrentWeatherContext);

export const WeatherForecastContext = createContext<WeatherForecastContextType>({ setWeatherForecast: (forecast) => { throw new Error('Provider not found') } })
export const useWeatherForecast = () => useContext(WeatherForecastContext);