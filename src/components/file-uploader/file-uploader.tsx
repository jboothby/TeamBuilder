import * as React from 'react';
import { FileUploader as CarbonFileUploader } from 'carbon-components-react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {addPeople, clearPeople, Person } from '../../redux/peopleSlice';
const fs = require('fs');


export const FileUploader: React.FC = () => {
    const csvHasHeader = useAppSelector(state => state.settings.csvHasHeader);
    const dispatch = useAppDispatch();

    const handleFileDelete = () => dispatch(clearPeople());

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: File = event.target.files[0];
        const path: string =  (file as any).path; // This is bad JuJu, but HTML5 file obj does have path prop

        // Strip first line if the csv contains header
        const data = csvHasHeader
            ? fs.readFileSync(path).toString().split('\n').slice(1,)
            : fs.readFileSync(path).toString().split('\n')

        const people: Person[] = data.map(x => {
            return({
                name: x.split(',').join(' '),
                assigned: false,
                team: null,
            } as Person)
        });
        dispatch(addPeople(people));
    }

    return (
        <CarbonFileUploader
            labelTitle={"Upload student names"}
            labelDescription={"Only .csv files are supported"}
            buttonLabel={"Add file"}
            buttonKind={"primary"}
            accept={['.csv']}
            multiple={false}
            iconDescription={'Clear file'}
            filenameStatus={'edit'}
            onChange={handleFileUpload}
            onDelete={handleFileDelete}
        />
    )
}
