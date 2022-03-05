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
    const students = useAppSelector(state => state.people.people).filter(x => x.assigned);
    const { teamSize } = useAppSelector(state => state.settings);
    const [teams, setTeams] = React.useState<Map<TeamId, Team>>(new Map<TeamId, Team>());

    // Group students by into teams to display
    React.useEffect(() => {
        if(!students.length) return;

        const teamMap = new Map<TeamId, Team>();

        students.forEach(student => {
            if(!teamMap.has(student.team)){
                teamMap.set(student.team, {id: student.team, members: [student]} as Team)
            } else {
                teamMap.set(student.team, {id: student.team, members: [...teamMap.get(student.team).members, student]})
            }
        });

        setTeams(teamMap);
    }, [students]);

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
                {Array.from(teams.values()).map(team =>
                    <TableRow id={team.id}>
                        <TableCell>
                            {team.id}
                        </TableCell>
                        {team.members.map(member =>
                            <TableCell key={member.name}>
                                {member.name}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>

    )
}
