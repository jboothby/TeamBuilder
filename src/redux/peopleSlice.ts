// State management
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TeamNumber = number;

export interface Person {
    name: string,
    highlighted: boolean
}

export interface Team {
    number: TeamNumber;
    members: Person[];
}

interface PeopleState {
    unassignedPeople: Person[];
    teams: Record<TeamNumber, Team>
    animation: boolean
}

const initialState: PeopleState = {
    unassignedPeople: [], teams: {}, animation: true
}

export const highestTeam = (teams: Record<TeamNumber, Team>): TeamNumber => {
    const teamNumbers = Array.from(Object.keys(teams)).map(x => Number(x))
    return teamNumbers.length ? Math.max(...teamNumbers) : 0;
}

export const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
        addPeople: (state, action: PayloadAction<Person[]>) => {
            state.unassignedPeople = [...state.unassignedPeople, ...action.payload];
        },
        clearPeople: state => {
            state.unassignedPeople = [];
        },
        // Must provide the team size to this from action creator
        assignNextTeam: (state, action: PayloadAction<Number>) => {
            if (state.unassignedPeople.length === 0) return;
            const nextTeamNumber = highestTeam(state.teams) + 1;
            const reallyBigPrime = 1009;
            let newTeamMembers: Person[] = [];
            // Add members until size of team is met
            for (let i = 1; i <= action.payload && i <= state.unassignedPeople.length; i++) {
                const psuedoRandomIndex = ((i * reallyBigPrime) % (state.unassignedPeople.length));
                newTeamMembers.push(state.unassignedPeople[psuedoRandomIndex])
            }
            state.unassignedPeople = state.unassignedPeople.filter(x => !(newTeamMembers.includes(x)))
            state.teams[nextTeamNumber] = { number: nextTeamNumber, members: newTeamMembers } as Team;
        },
        clearTeams: state => {
            const peopleToUnassign =
                Object.values(state.teams).reduce<Person[]>((acc, val) => {
                    acc.push(...val.members);
                    return acc;
                }, [] as Person[])
            state.unassignedPeople = [...state.unassignedPeople, ...peopleToUnassign]
            state.teams = {};
        },
        setAnimation: (state, action: PayloadAction<boolean>) => {
            state.animation = action.payload;
        },
        //highlight person at given index in unassigned array
        highlightPerson: (state, action: PayloadAction<number>) => {
            state.unassignedPeople[action.payload].highlighted = !(state.unassignedPeople[action.payload].highlighted);
        },
        assignPeopleToTeam: (state, action: PayloadAction<{ teamId: TeamNumber, people: Person[] }>) => {
            const { teamId, people } = action.payload;
            state.teams[teamId] = { number: teamId, members: people };
            state.unassignedPeople = state.unassignedPeople.filter(x => !(people.map(person => person.name).includes(x.name)));
        }
    }
})

export const { 
    addPeople,
    clearPeople,
    assignNextTeam,
    clearTeams,
    setAnimation,
    highlightPerson,
    assignPeopleToTeam
} = peopleSlice.actions;

export default peopleSlice.reducer;
