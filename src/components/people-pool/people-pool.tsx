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
import { Person } from '../../redux/peopleSlice';

const HighlightCell = styled(CarbonCell)`
    background-color: ${ blue20 };
    padding-top: 1px;
    padding-bottom: 2px;
`

const Cell = styled(CarbonCell)`
    padding-top: 1px;
    padding-bottom: 2px;
`

const HeaderCell = styled(CarbonCell)`
    background-color: #0F62FE;
    padding-top: 7px;
    padding-bottom: 7px;
    text-align: center;
    color: white;
    height: 20px;
`
type ReduceReturnType = {
    even: Person[],
    odd: Person[]
}

export const PeoplePool: React.FC = () => {

    const people = useAppSelector(state => state.people.unassignedPeople);
    let groups: ReduceReturnType = null;

    return(
        <>
            <StructuredListWrapper>
                <StructuredListHead>
                    <StructuredListRow head>
                        <HeaderCell head> Unassigned </HeaderCell>
                    </StructuredListRow>
                </StructuredListHead>
                <StructuredListBody>
                    { people.map(person =>
                        <StructuredListRow key={`${person.id}-row`}>
                            {person.highlighted
                                ? <HighlightCell>{person.name} </HighlightCell>
                                : <Cell>{person.name} </Cell>
                            }
                        </StructuredListRow>)
                    }
                </StructuredListBody>
            </StructuredListWrapper>
        </>
    )
}
