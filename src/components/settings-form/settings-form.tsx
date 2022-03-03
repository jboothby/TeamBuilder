import * as React from 'react';
import {
    Form,
    FormGroup,
    NumberInput,
    FileUploader,
    Toggle,
    Button,
} from 'carbon-components-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setDarkMode, setAnimation, setTeamSize } from "../../redux/settingSlice";
import styled from '@emotion/styled'

export const SettingsForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { darkMode, animation, teamSize } = useAppSelector(state => state.settings);

    const handleTeamSizeChange = () => {
        const currentValue: number = Number(
            (document.getElementById('teamsize-number-input') as HTMLInputElement).value
        )
        dispatch(setTeamSize(currentValue));
    }

    const TextColorToggle = styled(Toggle)`
      .bx--toggle-input__label {
        color: #0F62FE
      }
    `
    const TextColorNumberInput = styled(NumberInput)`
      .bx--label {
        color: #0F62FE
      }
    `

    return (
        <Form>
            <FormGroup legendText={'Settings Toggles'}>
                <TextColorToggle
                    labelText={"Enable selection animations"}
                    size={'md'}
                    labelA={"Off"}
                    lableB={"On"}
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
            <FormGroup>
                <TextColorNumberInput
                    label={"People per team"}
                    min={2}
                    max={10}
                    value={teamSize}
                    id={"teamsize-number-input"}
                    invalidText={"Number must be { x | 2 <= x <= 10 }"}
                    onChange={handleTeamSizeChange}
                />
            </FormGroup>
        </Form>
    )
}

