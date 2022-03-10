import * as React from 'react';
import {
    StructuredListWrapper,
    StructuredListHead,
    StructuredListRow,
    StructuredListBody,
    StructuredListCell as CarbonCell
} from 'carbon-components-react';
import { useAppSelector } from '../../redux/hooks'
import styled from '@emotion/styled';
import { blue20 } from '@carbon/colors';

const HighlightCell = styled(CarbonCell)`
    background-color: ${ blue20 };
    padding-top: 2px;
    padding-bottom: 4px;
`

const Cell = styled(CarbonCell)`
    padding-top: 2px;
    padding-bottom: 4px;
`

const HeaderCell = styled(CarbonCell)`
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
                        <HeaderCell head> Unassigned </HeaderCell>
                    </StructuredListRow>
                </StructuredListHead>
                <StructuredListBody>
                    {people.map(person =>
                        <StructuredListRow key={`${person.name}-row`}>
                            {person.highlighted
                                ? <HighlightCell>{person.name} </HighlightCell>
                                : <Cell>{person.name} </Cell>
                            }
                        </StructuredListRow>)}
                </StructuredListBody>
            </StructuredListWrapper>
        </>
    )
}
