import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "./api/weatherApi";
import geoReducer from './slices/geoSlice';
import dataTypeReducer from './slices/dataTypeSlice'

export const store = configureStore({
    reducer: {
        datatype: dataTypeReducer,
        geolocation: geoReducer,
        [weatherApi.reducerPath]: weatherApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(weatherApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch