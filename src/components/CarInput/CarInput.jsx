//@flow
import React, {
    useState
} from 'react'
import simulator from '../../Classes/Simulator'
import Slider from '@mui/material/Slider';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

// export type InputType = "airForce" |
//     "carMass" |
//     "airDirection" |
//     "wheelFriction" |
//     "wheelRotation" |
//     "expectedVelocity"

export const InputType = {
    "airForce": "airForce",
    "carMass": "carMass",
    airDirection: "airDirection",
    wheelFriction: "wheelFriction",
    wheelRotation: "wheelRotation",
    expectedVelocity: "expectedVelocity",
}

function CarInput({
    value,
    onChange,
    text,
    type,
    params,
}) {
    const onValueChange = (event, value) => {
        onChange(value, type)
    }
    return (
        <div style={{ width: "100px" }}>
            <p style={{ color: "white", fontSize: "14px" }} >  {text}</p>
            <Slider
                aria-label="Volume"
                value={value}
                onChange={onValueChange}
                min={params?.min}
                max={params?.max}
                step={params?.steps}
            />
        </div>
    )
}

export default CarInput
