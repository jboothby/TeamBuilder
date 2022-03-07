import * as React from 'react';
import {
    Form,
    FormGroup,
    NumberInput as CarbonNumberInput,
    Toggle as CarbonToggle,
} from 'carbon-components-react';
import { FileUploader } from '../file-uploader/file-uploader'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setTeamSize, setCsvHasHeader } from "../../redux/settingSlice";
import styled from '@emotion/styled'
import { clearTeams } from "../../redux/peopleSlice";

const max_team_size = 10;
const min_team_size = 2;

const Toggle = styled(CarbonToggle)`
      .bx--toggle-input__label {
        padding-top: 10px;
      }
    `

const NumberInput = styled(CarbonNumberInput)`
      .bx--label {
        color: black;
      }
   `

export const SettingsForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { teamSize, csvHasHeader } = useAppSelector(state => state.settings);

    const handleTeamSizeChange = () => {
        const currentValue: number = Number(
            (document.getElementById('teamsize-number-input') as HTMLInputElement).value
        )
        if ( currentValue < min_team_size || currentValue > max_team_size ){
            return;
        }
        dispatch(setTeamSize(currentValue));
        dispatch(clearTeams());
    }

    const handleCsvHeaderToggleChange = () => {
        dispatch(setCsvHasHeader(!csvHasHeader));
    }

    return (
        <Form>
            <FormGroup legendText={''}>
                <NumberInput
                    label={"People per team"}
                    min={min_team_size}
                    max={max_team_size}
                    value={teamSize}
                    id={"teamsize-number-input"}
                    invalidText={"Number must be { x | 2 <= x <= 10 }"}
                    onChange={handleTeamSizeChange}
                />
            </FormGroup>
            <FormGroup legendText={''}>
                <FileUploader/>
                <Toggle
                    labelText={"CSV has headers"}
                    labelA={"No"}
                    labelB={"Yes"}
                    defaultToggled={csvHasHeader}
                    id={"header-toggle"}
                    onChange={handleCsvHeaderToggleChange}
                    />
            </FormGroup>
        </Form>
    )
}

