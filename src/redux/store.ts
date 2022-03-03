import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './peopleSlice';
import settingReducer from './settingSlice';


export const store = configureStore({
    reducer: {
        people: peopleReducer,
        settings: settingReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
