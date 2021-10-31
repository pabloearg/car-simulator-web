//@flow
import React, {
  useState
} from 'react'
import simulator from '../../Classes/Simulator'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import CarInput, { InputType } from '../CarInput';
import {
  INITIAL_AIR_DIRECTION,
  INITIAL_AIR_FORCE,
  INITIAL_FORCE,
  INITIAL_WHEEL_FRICTION,
  INITIAL_WHEEL_ROTATION,
  INITIAL_EXPECTED_VELOCITY,
  INITIAL_CAR_MASS,
} from "../../utils";

function CarSimulation() {
  let clock
  const [airForce, setAirForce] = useState(INITIAL_AIR_FORCE)
  const [wheelFriction, setWheelFriction] = useState(INITIAL_WHEEL_FRICTION)
  const [carMass, setCarMass] = useState(INITIAL_CAR_MASS)
  const [expectedVelocity, setExpectedVelocity] = useState(INITIAL_EXPECTED_VELOCITY)
  const [airDirection, setAirDirection] = useState(INITIAL_AIR_DIRECTION);
  const [wheelRotation, setWheelRotation] = useState(INITIAL_WHEEL_ROTATION)
  const [engineForce, setEngineForce] = useState(INITIAL_FORCE)
  const [speed, setSpeed] = useState(simulator.getSpeed())

  const handleAirDirectionChange = (event, newValue) => {
    setAirDirection(newValue);
    console.log({ newValue })
    simulator.airDirection = newValue
    updateInfo()
  };
  const [gif, setGif] = React.useState(simulator.getGif())

  const onChange = (newValue, type) => {
    if (type === InputType.airForce) {
      setAirForce(newValue)
      simulator.airForce = newValue
    }
    if (type === InputType.carMass) {
      setCarMass(newValue)
      simulator.carMass = newValue
    }
    if (type === InputType.expectedVelocity) {
      simulator.expectedVelocity = newValue
      setExpectedVelocity(newValue)
    }
    if (type === InputType.wheelFriction) {
      simulator.groundMu = newValue
      setWheelFriction(newValue)
    }
    if (type === InputType.wheelRotation) {
      simulator.wheelRotation = newValue
      setWheelRotation(newValue)
    }
    updateInfo()
    // clearInterval(clock)
    // clock = setInterval(() => {
    //   const currentAcc =  simulator.getCurrentAcceleration()
    //   simulator.speed += currentAcc
    //   setSpeed(simulator.speed)
    //   setEngineForce(simulator.engineForce)
    //   if(simulator.getNeededEngineForce() === 0){
    //     clearInterval(clock)
    //     return
    //   }
    //   setTimeout(() => {
    //     simulator.engineForce += simulator.getNeededEngineForce()
    //     setEngineForce(simulator.engineForce)
    //   }, 1000);
    //   setGif(simulator.getGif())
    // }, 1100);
  }

  const updateInfo = () => {
    const currentAcc = simulator.getCurrentAcceleration()
    console.log("currentAcc: ", currentAcc)
    simulator.speed += currentAcc
    setSpeed(simulator.speed)
    // setEngineForce(simulator.engineForce)
    if (simulator.getNeededEngineForce() === 0) {
      clearInterval(clock)
      return
    }
    setTimeout(() => {
      simulator.engineForce += simulator.getNeededEngineForce()
      console.log("simulator.getNeededEngineForce(): ", simulator.getNeededEngineForce())
      setEngineForce(simulator.engineForce)
      updateInfo()
      setEngineForce(simulator.engineForce)
      setGif(simulator.getGif())
    }, 2000);
    setGif(simulator.getGif())
  }
  return (
    <div>
      <div>
        <p>{`Current speed: ${speed}`}</p>
      </div>
      <div>
        <p>{`Current Engine Force: ${engineForce}`}</p>
      </div>
      <div>
        <p>{`Expected speed: ${110}`}</p>
      </div>
      <img src={gif} className="App-logo" alt="logo" style={{ width: "400px", height: "200px" }} />
      {/* <CarInput
        onChange={onChange}
        text={`Expected Velocity ${expectedVelocity}`}
        type={InputType.expectedVelocity}
        value={expectedVelocity}
        params={{
          min: 10,
          max: 200,
          steps: 10,
        }}
      /> */}
      <div style={{ flexDirection: "row",display: "flex" }}>
        <div style={{flex:1}}>
          <CarInput
            onChange={onChange}
            text={`Car Mass ${carMass}`}
            type={InputType.carMass}
            value={carMass}
            params={{
              min: 2000,
              max: 5000,
              steps: 100,
            }}
          />
          <CarInput
            onChange={onChange}
            text={`Whell Friction ${wheelFriction}`}
            type={InputType.wheelFriction}
            value={wheelFriction}
            params={{
              min: 0.2,
              max: 0.8,
              steps: 0.1,
            }}
          />
        </div>
        <div style={{flex:1}}>
          <CarInput
            onChange={onChange}
            text={`Air Force ${airForce}`}
            type={InputType.airForce}
            value={airForce}
            params={{
              min: 0,
              max: 10000,
              steps: 1000,
            }}
          />
          <FormLabel component="legend" style={{ textAlign: "left", color: "white" }}>Air Direction</FormLabel>
          <RadioGroup
            aria-label="Air Direction"
            name="controlled-radio-buttons-group"
            value={airDirection}
            onChange={handleAirDirectionChange}
          >
            <FormControlLabel value="front" control={<Radio />} label="Front" />
            <FormControlLabel value="rear" control={<Radio />} label="Rear" />
          </RadioGroup>
        </div>
      </div>
      {/* <CarInput
        onChange={onChange}
        text={`Whell Rotation ${wheelRotation}`}
        type={InputType.wheelRotation}
        value={wheelRotation}
      /> */}
    </div>
  )
}

export default CarSimulation
