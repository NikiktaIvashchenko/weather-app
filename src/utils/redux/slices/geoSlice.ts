import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeolocationInfo } from "../../types";
import type { RootState } from "../store";


interface GeoState {
    value: GeolocationInfo;
}

const initialState: GeoState = {
    value: {
        name: 'Moscow',
        lon: 37.618423,
        lat: 55.751244,
        country: 'RU'
    }
}

export const geoSlice = createSlice({
    name: 'geolocation',
    initialState,
    reducers: {
        setGeolocation: (state, action: PayloadAction<GeolocationInfo>) => {
            state.value = action.payload;
        }
    }
})

export const { setGeolocation } = geoSlice.actions;
export const selectGeo = (state: RootState) => state.geolocation.value

export default geoSlice.reducer