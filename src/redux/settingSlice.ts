import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from './store';

export enum CsvFormat {
    'LastThenFirst',
    'FirstThenLast',
    'SingleCellName'
}

interface SettingState {
    teamSize: number,
    darkMode: boolean,
    animation: boolean,

    csvHasHeader: boolean,
    csvFormat: CsvFormat
}

const initialState: SettingState = {
    teamSize: 3,
    darkMode: false,
    animation: true,

    csvHasHeader: false,
    csvFormat: CsvFormat.FirstThenLast
}

export const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setTeamSize: (state, action: PayloadAction<number>) => {
            state.teamSize = action.payload;
        },
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
        },
        setAnimation: (state, action: PayloadAction<boolean>) => {
            state.animation = action.payload;
        },
        setCsvHasHeader: (state, action: PayloadAction<boolean>) => {
            state.csvHasHeader = action.payload;
        },
        setCsvFormat: (state, action: PayloadAction<CsvFormat>) => {
            state.csvFormat = action.payload;
        }
    }
})

export const {
    setTeamSize,
    setDarkMode,
    setAnimation,
    setCsvFormat,
    setCsvHasHeader,
} = settingSlice.actions;

export const selectSettings = (state: RootState) => state.settings;

export default settingSlice.reducer;
