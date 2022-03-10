import {
    Header,
    HeaderName,
    HeaderGlobalBar,
    HeaderGlobalAction,
    HeaderPanel,
    Button
} from 'carbon-components-react';
import styled from '@emotion/styled';
import Settings20 from '@carbon/icons-react/es/settings/20';
import * as React from 'react';
import { SettingsForm } from '../settings-form/settings-form'
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import { clearTeams} from "../../redux/peopleSlice";
import { gray20 } from '@carbon/colors';
import {CsvDownload} from "../csv-download/csv-download";
import { TeamAssignButton } from '../team-assign-button/team-assign-button';

const ColorPanel = styled(HeaderPanel)`
    background-color: ${gray20};
    h2 {
      text-align: center;
      color: black;
    }
`

export const Shell: React.FC = () => {
    const [expanded, setExpanded] = React.useState(false);
    const { teams, unassignedPeople } = useAppSelector(state => state.people);

    const dispatch = useAppDispatch();
    const handleClearTeams = () => dispatch(clearTeams());

    const toggleRightPanel = () => {
        setExpanded(!expanded);
    }

    return(
        <Header aria-label="Shell Header">
            <HeaderName href={'https://github.com/jboothby/TeamBuilder'} prefix={""}> TeamBuilder </HeaderName>
            <HeaderGlobalBar>
                {(!unassignedPeople.length && Object.values(teams).length) &&
                    <CsvDownload/>
                }
                {Object.values(teams).length &&
                    <Button kind={'danger'} onClick={handleClearTeams}>Clear teams</Button>
                }
                <TeamAssignButton/>
                <HeaderGlobalAction
                    tooltipAlignment="end"
                    isActive={expanded}
                    aria-label="Settings"
                    onClick={toggleRightPanel}>
                    <Settings20 />
                </HeaderGlobalAction>
            </HeaderGlobalBar>
            <ColorPanel aria-label="Header Panel" expanded={expanded}>
                <h2>Settings</h2>
                <SettingsForm/>
            </ColorPanel>
        </Header>
    )
}

