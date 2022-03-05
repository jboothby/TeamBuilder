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
    color: white;
`

export const PeoplePool: React.FC = () => {

    const people = useAppSelector(state => state.people.people).filter(x => !x.assigned);
    return(
        <>
            <StructuredListWrapper>
                <StructuredListHead>
                    <StructuredListRow head>
                        <BlueCell head> Unassigned People </BlueCell>
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
