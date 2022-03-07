import * as React from 'react';
import { Grid as CarbonGrid, Row, Column as CarbonColumn } from 'carbon-components-react';
import { PeoplePool } from '../people-pool/people-pool';
import { TeamTable } from '../team-table/team-table';
import styled from '@emotion/styled';
import {Person, Team } from '../../redux/peopleSlice';
import { useAppSelector } from '../../redux/hooks';

const Grid = styled(CarbonGrid)`
    padding-left: 0;
    padding-right: 0;
`

const Column = styled(CarbonColumn)`
    padding-left: 0;
    padding-right: 0;
    padding-top: 48px;
`

export const ShellGrid: React.FC = () => {
    const people: Person[] = useAppSelector(state => state.people.unassignedPeople);
    const teams: Team[] = useAppSelector(state => Object.values(state.people.teams));

    return (
        <Grid fullWidth>
            <Row>
                <Column sm={1} md={1} lg={2}>
                    <PeoplePool/>
                </Column>
                <Column sm={3} md={7} lg={10}>
                    <TeamTable/>
                    { !(people.length || teams.length) &&
                        <span>
                            <h3>Please upload a .csv file with student names to begin</h3>
                            <h3>The upload button is under the settings menu</h3>
                        </span>
                    }
                </Column>
            </Row>
        </Grid>
    )
}
