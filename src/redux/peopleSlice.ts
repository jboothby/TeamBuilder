// State management
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from './store';

export interface Person {
    name: string,
    assigned: boolean,
    team: string,
}

interface PeopleState {
    people: Person[]
}

const initialState: PeopleState = {
    people: []
}

export const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
        addPeople: (state, action: PayloadAction<Person[]>) => {
            state.people = [...state.people, ...action.payload];
        }
    }
})

export const { addPeople } = peopleSlice.actions;
export const selectPeople = (state: RootState) => state.people;

export default peopleSlice.reducer
