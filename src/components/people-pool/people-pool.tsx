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
import { blue60, blue20, white } from '@carbon/colors';
import { Person } from '../../redux/peopleSlice';


const HighlightCell = styled(CarbonCell)`
    background-color: ${props => props.highlight ? blue20 : white};
    padding-top: 1px;
    padding-bottom: 2px;
`

const HeaderCell = styled(CarbonCell)`
    background-color: ${ blue60 };
    padding-top: 7px;
    padding-bottom: 7px;
    text-align: center;
    color: white;
    height: 20px;
`

const createTwoColumns = (people: Person[]): React.ReactNode => {
    const output: React.ReactElement[] = [];
    for(let i = 0; i < people.length; i += 2){
        output.push(
            <StructuredListRow key={`row-${i/2}`}>
                <HighlightCell
                    highlight={people[i].highlighted ? 1 : 0}
                    key={people[i].name}
                >
                    {people[i].name}
                </HighlightCell>
                {people.length > i + 1 && 
                    <HighlightCell
                        highlight={people[i+1].highlighted ? 1 : 0}
                        key={people[i+1].name}
                    >
                        {people[i + 1].name}
                    </HighlightCell>
                }
            </StructuredListRow>
        )
    }
    return( 
        <>
            {output}
        </>
    )
}

const createSingleColumn = (people: Person[]): React.ReactNode => {
    return(
        <>
            {people.map(person =>
                <StructuredListRow key={`row-${person.name}`}>
                    <HighlightCell
                        highlight={person.highlighted ? 1 : 0}
                        key={person.name}
                    >
                        {person.name}
                    </HighlightCell>
                </StructuredListRow>
            )}
        </>
    )
}

export const PeoplePool: React.FC = () => {

    const people = useAppSelector(state => state.people.unassignedPeople);

    const singleColumn = createSingleColumn(people);
    const doubleColumn = createTwoColumns(people);

    // Render two columns if there are more than 30 unassigned people
    return(
        <>
            <StructuredListWrapper>
                <StructuredListHead>
                    <StructuredListRow head>
                        <HeaderCell head> Unassigned </HeaderCell>
                        {people.length > 30 && <HeaderCell head></HeaderCell>}
                    </StructuredListRow>
                </StructuredListHead>
                <StructuredListBody>
                    {people.length > 30
                        ? createTwoColumns(people)
                        : createSingleColumn(people)
                    }
                </StructuredListBody>
            </StructuredListWrapper>
        </>
    )
}