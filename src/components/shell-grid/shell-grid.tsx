import * as React from 'react';
import { Grid as CarbonGrid, Row, Column as CarbonColumn } from 'carbon-components-react';
import { PeoplePool } from '../people-pool/people-pool';
import { TeamTable } from '../team-table/team-table';
import styled from '@emotion/styled';

const Grid = styled(CarbonGrid)`
    padding-left: 0;
    padding-right: 0;
`

const Column = styled(CarbonColumn)`
    padding-left: 0;
    padding-right: 0;
    padding-top: 40px;
`

export const ShellGrid: React.FC = () => {
    return (
        <Grid fullWidth>
            <Row>
                <Column sm={1} md={1} lg={2}>
                    <PeoplePool/>
                </Column>
                <Column sm={3} md={7} lg={10}>
                    <TeamTable/>
                </Column>
            </Row>
        </Grid>
    )
}
