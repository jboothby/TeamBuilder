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
import {assignNextTeam} from "../../redux/peopleSlice";

const ColorPanel = styled(HeaderPanel)`
    background-color: #E0E0E0;
    h2 {
      text-align: center;
      color: black;
    }
`

export const Shell: React.FC = () => {
    const [expanded, setExpanded] = React.useState(false);
    const dispatch = useAppDispatch();
    const teamSize = useAppSelector(state => state.settings.teamSize)
    const createNewTeam = () => dispatch(assignNextTeam(teamSize));

    const toggleRightPanel = () => {
        setExpanded(!expanded);
    }

    return(
        <Header aria-label="Shell Header">
            <HeaderName href={'https://github.com/jboothby/TeamBuilder'} prefix={""}> TeamBuilder </HeaderName>
            <HeaderGlobalBar>
                <Button kind={'primary'} onClick={createNewTeam}>Assign next team</Button>
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

