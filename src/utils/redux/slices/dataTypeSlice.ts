import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActiveDataType } from "../../types";
import type { RootState } from "../store";

interface DataTypeState {
    activeType: ActiveDataType;
}

const initialState: DataTypeState = {
    activeType: ActiveDataType.WeatherForecast,
}


export const dataTypeSlice = createSlice({
    name: 'datatype',
    initialState,
    reducers: {
        changeType: (state, action: PayloadAction<ActiveDataType>) => {
            state.activeType = action.payload;
        }
    }
})

export const { changeType } = dataTypeSlice.actions;

export const selectDataType = (state: RootState) => state.datatype.activeType;
export default dataTypeSlice.reducer;