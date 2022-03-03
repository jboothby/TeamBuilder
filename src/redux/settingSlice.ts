import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from './store';

interface SettingState {
    teamSize: number,
    darkMode: boolean,
    animation: boolean,
}

const initialState: SettingState = {
    teamSize: 3,
    darkMode: false,
    animation: true,
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
        }
    }
})

export const { setTeamSize, setDarkMode, setAnimation } = settingSlice.actions;
export const selectSettings = (state: RootState) => state.settings;

export default settingSlice.reducer;
