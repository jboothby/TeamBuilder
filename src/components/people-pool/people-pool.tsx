import * as React from 'react';
import {
    Button,
    StructuredListWrapper,
    StructuredListHead,
    StructuredListRow,
    StructuredListBody,
    StructuredListCell
} from 'carbon-components-react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import {addPeople, Person} from "../../redux/peopleSlice";
import styled from '@emotion/styled';

const ShorterCell = styled(StructuredListCell)`
    padding-top: 8px;
    padding-bottom: 12px;
`

export const PeoplePool: React.FC = () => {
    const dispatch = useAppDispatch()

    const addTom = () => {
        const Tom = {name: `Tom ${people.length}`, team: `${people.length % 4}`} as Person;
        dispatch(addPeople([Tom]));
    }

    const people = useAppSelector(state => state.people.people);

    return(
        <>
            <Button onClick={addTom}>Click this button to add tom</Button>
            <StructuredListWrapper>
                <StructuredListHead>
                    <StructuredListRow head>
                        <StructuredListCell head> Student Names </StructuredListCell>
                    </StructuredListRow>
                </StructuredListHead>
                <StructuredListBody>
                    {people.map(person =>
                        <StructuredListRow>
                            <ShorterCell> {person.name} </ShorterCell>
                        </StructuredListRow>)}
                </StructuredListBody>
            </StructuredListWrapper>
        </>
    )
}
