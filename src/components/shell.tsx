import {
    Header,
    HeaderName,
    HeaderGlobalBar,
    HeaderGlobalAction,
    HeaderPanel
} from 'carbon-components-react';

import Settings20 from '@carbon/icons-react/es/settings/20';
import * as React from 'react';

export const Shell: React.FC = () => {
    const [expanded, setExpanded] = React.useState(false);

    const toggleRightPanel = () => {
        setExpanded(!expanded);
    }

    return(
        <Header aria-label="Shell Header">
            <HeaderName href={'https://github.com/jboothby'} prefix={""}> TeamBuilder </HeaderName>
            <HeaderGlobalBar>
                <HeaderGlobalAction
                    tooltipAlignment="end"
                    isActive={expanded}
                    aria-label="Settings"
                    onClick={toggleRightPanel}>
                    <Settings20 />
                </HeaderGlobalAction>
            </HeaderGlobalBar>
            <HeaderPanel aria-label="Header Panel" expanded={expanded} />
        </Header>
    )
}

