import * as React from 'react';
import { Button } from 'carbon-components-react';
import { highestTeam, highlightPerson, assignPeopleToTeam, Person, assignNextTeam, setBusy } from '../../redux/peopleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const delay = (millis: number) => {
    return new Promise(resolve => setTimeout(resolve, millis))
}

const shuffleArray = (arr: Person[]): Person[] => {
    const arrCopy = [...arr]
    for( let i = arrCopy.length - 1; i > 0 ; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]]
    }
    return arrCopy;
}

export const TeamAssignButton: React.FC = () => {
    const { teamSize } = useAppSelector( state => state.settings );
    const { teams, unassignedPeople, animation, busy } = useAppSelector( state => state.people );
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        if( !animation || unassignedPeople.length <= teamSize ){
            dispatch(assignNextTeam(teamSize));
            return;
        }

        dispatch(setBusy(true));

        let newTeam: Person[] = [];

        let delayTime = 100;
        const shuffledPeople = shuffleArray(unassignedPeople);
        let id: number;
        const iterCount = shuffledPeople.length > 15 ? 15 : shuffledPeople.length;

        // Iterate to team size, or amount of remaining people
        for(let i = 0; i < teamSize; i++){
            for(let j = 0; j < iterCount - i; j++){
                id = shuffledPeople[j].id;

                // If last person, flash and then stay highlighted
                if ( j === (iterCount - i - 1)){
                    dispatch(highlightPerson(id))
                    await delay(200);
                    dispatch(highlightPerson(id))
                    await delay(200);
                    dispatch(highlightPerson(id))
                    await delay(200);
                    dispatch(highlightPerson(id))
                    await delay(200);
                    dispatch(highlightPerson(id))
                
                    newTeam.push(shuffledPeople[j])
                }

                // Delay time should be a fraction of size of people to avoid overly long times
                // Plan to take 5 seconds per team pick
                delayTime = 100;
                dispatch(highlightPerson(id))
                await delay(delayTime);
                dispatch(highlightPerson(id))
                await delay(delayTime);
            }
        }
        const nextHighestTeam = highestTeam(teams) + 1;

        await delay(500);
        dispatch(assignPeopleToTeam({teamId: nextHighestTeam, people: newTeam}))
        dispatch(setBusy(false));
    }

    return(
        <Button
            disabled={!unassignedPeople.length || busy}
            onClick={handleClick}
            kind={'primary'}
        >
            Assign Next Team
        </Button>
    )
}