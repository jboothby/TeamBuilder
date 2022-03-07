import * as React from 'react';
import {
    StructuredListWrapper,
    StructuredListHead,
    StructuredListRow,
    StructuredListBody,
    StructuredListCell
} from 'carbon-components-react';
import { useAppSelector } from '../../redux/hooks'
import styled from '@emotion/styled';


const ShorterCell = styled(StructuredListCell)`
    padding-top: 2px;
    padding-bottom: 4px;
`
const BlueCell = styled(StructuredListCell)`
    background-color: #0F62FE;
    padding-top: 7px;
    padding-bottom: 7px;
    text-align: center;
    color: white;
    height: 20px;
`

export const PeoplePool: React.FC = () => {

    const people = useAppSelector(state => state.people.unassignedPeople);
    return(
        <>
            <StructuredListWrapper>
                <StructuredListHead>
                    <StructuredListRow head>
                        <BlueCell head> Unassigned </BlueCell>
                    </StructuredListRow>
                </StructuredListHead>
                <StructuredListBody>
                    {people.map(person =>
                        <StructuredListRow key={`${person.name}-row`}>
                            <ShorterCell> {person.name} </ShorterCell>
                        </StructuredListRow>)}
                </StructuredListBody>
            </StructuredListWrapper>
        </>
    )
}
