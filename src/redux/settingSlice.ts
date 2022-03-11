import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingState {
    teamSize: number,
    csvHasHeader: boolean,
}

const initialState: SettingState = {
    teamSize: 3,
    csvHasHeader: true,
}

export const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setTeamSize: (state, action: PayloadAction<number>) => {
            state.teamSize = action.payload;
        },
        setCsvHasHeader: (state, action: PayloadAction<boolean>) => {
            state.csvHasHeader = action.payload;
        },
    }
})

export const {
    setTeamSize,
    setCsvHasHeader,
} = settingSlice.actions;

export default settingSlice.reducer;
