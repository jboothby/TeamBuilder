import * as React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Person } from '../../redux/peopleSlice';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from 'carbon-components-react';

type TeamId = string;

interface Team {
    id: TeamId,
    members: Person[]
}


export const TeamTable: React.FC = () => {
    const { teamSize } = useAppSelector(state => state.settings);
    const { teams } = useAppSelector(state => state.people);


    const headers = ['Team']
    for(let i = 1; i <= teamSize; i++){
        headers.push(`Student ${i}`)
    }

    return (
        <Table size={"sm"}>
            <TableHead>
                <TableRow>
                    {headers.map(header =>
                        <TableHeader key={header}>
                            {header}
                        </TableHeader>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {Array.from(Object.values(teams))
                    .sort((a,b) => a.number - b.number)
                    .map(team =>
                        <TableRow key={team.number}>
                            <TableCell>
                                {team.number}
                            </TableCell>
                            {team.members.length && team.members.map(member =>
                                <TableCell key={member.id}>
                                    {member.name}
                                </TableCell>
                            )}
                        </TableRow>
                        )
                }
            </TableBody>
        </Table>
    )
}
