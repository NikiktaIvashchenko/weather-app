import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { WeatherForecast } from '../../classes'
import { GeolocationInfo, IAirQuality, IWeatherForecast } from '../../types'

interface Coords {
    lat: number;
    lon: number;
}

export const weatherApi = createApi({
    reducerPath: 'weather',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_WEATHER_API_LINK}`
    }),
    endpoints: (builder) => ({
        getCurrentWeather: builder.query({
            query: (name: string) => `/weather?q=${name}&appid=${process.env.REACT_APP_WEATHER_API}&cnt=37`,
            transformResponse: (response: IWeatherForecast, meta, arg) => {
                return response as IWeatherForecast;
            }
        }),
        getWeatherForecast: builder.query({
            query: (name: string) => `/forecast?q=${name}&appid=${process.env.REACT_APP_WEATHER_API}`,
            transformResponse: ({ list }: { list: IWeatherForecast[] }, meta, arg) => {
                return list.map((item) => item as IWeatherForecast);
            }
        }),
        getAirQuality: builder.query({
            query: ({ lat, lon }: Coords) => `/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API}`,
            transformResponse: ({ list }: { list: IAirQuality[] }, meta, arg) => {
                return list as IAirQuality[];
            }
        })
    })
})

export const { useGetCurrentWeatherQuery, useGetWeatherForecastQuery, useGetAirQualityQuery } = weatherApi
