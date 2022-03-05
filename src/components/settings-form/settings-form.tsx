import * as React from 'react';
import {
    Form,
    FormGroup,
    NumberInput,
    Toggle,
} from 'carbon-components-react';
import { FileUploader } from '../file-uploader/file-uploader'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setDarkMode, setAnimation, setTeamSize } from "../../redux/settingSlice";
import styled from '@emotion/styled'

const max_team_size = 10;
const min_team_size = 2;

const TextColorToggle = styled(Toggle)`
      .bx--toggle-input__label {
        color: black;
        padding-top: 10px;
      }
    `
const TextColorNumberInput = styled(NumberInput)`
      .bx--label {
        color: black;
      }
   `

export const SettingsForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { darkMode, animation, teamSize } = useAppSelector(state => state.settings);

    const handleTeamSizeChange = () => {
        const currentValue: number = Number(
            (document.getElementById('teamsize-number-input') as HTMLInputElement).value
        )
        if ( currentValue < min_team_size || currentValue > max_team_size ){
            return;
        }
        dispatch(setTeamSize(currentValue));
    }

    return (
        <Form>
            <FormGroup legendText={''}>
                <TextColorToggle
                    labelText={"Enable selection animations"}
                    size={'md'}
                    labelA={"Off"}
                    labelB={"On"}
                    defaultToggled={animation}
                    id={"animation-toggle"}
                />
                <TextColorToggle
                    labelText={"Enable dark mode"}
                    size={'md'}
                    labelA={"Off"}
                    labelB={"On"}
                    defaultToggled={darkMode}
                    id={"darkmode-toggle"}
                />
            </FormGroup>
            <FormGroup legendText={''}>
                <TextColorNumberInput
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
            </FormGroup>
        </Form>
    )
}

