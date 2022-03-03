import * as React from 'react';
import { Grid, Row, Column } from 'carbon-components-react';
import { PeoplePool } from '../people-pool/people-pool';
import { TeamTable } from '../team-table/team-table';
import styled from '@emotion/styled';

const NoPadGrid = styled(Grid)`
    padding-left: 0;
    padding-right: 0;
`

const NoPadColumn = styled(Column)`
    padding-left: 0;
    padding-right: 0;
`

export const ShellGrid: React.FC = () => {
    return (
        <NoPadGrid fullWidth>
            <Row>
                <NoPadColumn sm={1} md={2} lg={3}>
                    <h2>Student Pool</h2>
                    <PeoplePool/>
                </NoPadColumn>
                <NoPadColumn sm={3} md={6} lg={9}>
                    <h2>Teams</h2>
                    <TeamTable/>
                </NoPadColumn>
            </Row>
        </NoPadGrid>
    )
}
