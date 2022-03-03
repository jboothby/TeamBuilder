import * as React from 'react';
import { Grid, Row, Column } from 'carbon-components-react';
import { PeoplePool } from '../people-pool/people-pool';
import { TeamTable } from '../team-table/team-table';

export const ShellGrid: React.FC = () => {
    return (
        <Grid fullWidth>
            <Row>
                <Column sm={1} md={2} lg={3}>
                    <h2>Student Pool</h2>
                    <PeoplePool/>
                </Column>
                <Column sm={5} md={10} lg={13}>
                    <h2>Teams</h2>
                    <TeamTable/>
                </Column>
            </Row>
        </Grid>
    )
}
