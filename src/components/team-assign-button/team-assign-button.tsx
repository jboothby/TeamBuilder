import * as React from 'react';
import { Button } from 'carbon-components-react';
import { highestTeam, highlightPerson, assignPeopleToTeam, Person, assignNextTeam } from '../../redux/peopleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const delay = (millis: number) => {
    return new Promise(resolve => setTimeout(resolve, millis))
}

export const TeamAssignButton: React.FC = () => {
    const { teamSize } = useAppSelector( state => state.settings );
    const { teams, unassignedPeople, animation } = useAppSelector( state => state.people );
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        if( !animation || unassignedPeople.length <= teamSize ){
            dispatch(assignNextTeam(teamSize));
            return;
        }

        let newTeam: Person[] = [];

        const reallyBigPrime = 229;
        let index = 1;

        // Iterate to team size, or amount of remaining people
        for(let i = 0; i < teamSize; i++){
            for(let j = 0; j < unassignedPeople.length - i; j++){
                index = (j * reallyBigPrime) % (unassignedPeople.length);
                if ( j === (unassignedPeople.length - i - 1)){
                    dispatch(highlightPerson(index))
                    await delay(200);
                    dispatch(highlightPerson(index))
                    await delay(200);
                    dispatch(highlightPerson(index))
                    await delay(200);
                    dispatch(highlightPerson(index))
                    await delay(200);
                    dispatch(highlightPerson(index))
                
                    newTeam.push(unassignedPeople[index])
                }
                dispatch(highlightPerson(index))
                await delay(100);
                dispatch(highlightPerson(index))
                await delay(100);
            }
        }
        const nextHighestTeam = highestTeam(teams) + 1;

        await delay(500);
        dispatch(assignPeopleToTeam({teamId: nextHighestTeam, people: newTeam}))
    }

    return(
        <Button
            disabled={!unassignedPeople.length}
            onClick={handleClick}
            kind={'primary'}
        >
            Assign Next Team
        </Button>
    )
}