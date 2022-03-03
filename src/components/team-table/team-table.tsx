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

const NUMBER_IN_TEAMS = 3;

export const TeamTable: React.FC = () => {
    const students = useAppSelector(state => state.people.people);
    const [teams, setTeams] = React.useState<Map<TeamId, Team>>(new Map<TeamId, Team>());

    // Group students by into teams to display
    React.useEffect(() => {
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

    // TODO: Refactor this to use REDUX for number of teams
    const headers = ['Team']
    for(let i = 0; i <= NUMBER_IN_TEAMS; i++){
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
