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

export const SettingsForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { darkMode, animation, teamSize } = useAppSelector(state => state.settings);

    const handleTeamSizeChange = () => {
        const currentValue: number = Number(
            (document.getElementById('teamsize-number-input') as HTMLInputElement).value
        )
        dispatch(setTeamSize(currentValue));
    }

    return (
        <Form>
            <FormGroup legendText={'Settings Toggles'}>
                <Toggle
                    labelText={"Enable selection animations"}
                    size={'md'}
                    labelA={"Off"}
                    lableB={"On"}
                    defaultToggled={animation}
                    id={"animation-toggle"}
                />
                <Toggle
                    labelText={"Enable dark mode"}
                    size={'md'}
                    labelA={"Off"}
                    labelB={"On"}
                    defaultToggled={darkMode}
                    id={"darkmode-toggle"}
                />
            </FormGroup>
            <FormGroup legendText={'Team Parameters'}>
                <NumberInput
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

