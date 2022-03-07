import * as React from 'react';
import { CSVLink as ReactCSVLink } from 'react-csv';
import { useAppSelector } from '../../redux/hooks'
import styled from '@emotion/styled';
import { blue60 } from '@carbon/colors';

const CSVLink = styled(ReactCSVLink)`
  display: inline-flex;
  justify-content: center;
  max-width: 20rem;
  padding: 11px 63px 11px 15px;
  align-items: center;
  color: white;
  background-color: ${ blue60 };
`

export const CsvDownload: React.FC = () => {
    const { teams } = useAppSelector(state => state.people);
    const { teamSize } = useAppSelector(state => state.settings);

    const header = () => {
        const headers = ['Team']
        for (let i = 1; i <= teamSize; i++) {
            headers.push(`Student ${i}`)
        }
        return headers;
    }

    const data = () => {
        return (Object.values(teams).map(team =>
            [`${team.number}`, ...team.members.map(member => `${member.name}`)]
        ))
    }

    return (
        <CSVLink
            data={data()}
            headers={header()}
            filename={'random-teams.csv'}
        >
            Download CSV!
        </CSVLink>
    )
}
