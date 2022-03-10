import { compose, configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import peopleReducer from './peopleSlice';
import settingReducer from './settingSlice';

enableMapSet();

export const store = configureStore({
    reducer: {
        people: peopleReducer,
        settings: settingReducer
    },
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
