import {
    INITIAL_AIR_DIRECTION,
    INITIAL_AIR_FORCE,
    INITIAL_FORCE,
    INITIAL_WHEEL_FRICTION,
    INITIAL_WHEEL_ROTATION,
    INITIAL_EXPECTED_VELOCITY,
    INITIAL_CAR_MASS,
} from "../utils";

import carSlow1 from '../static/img/car_slow1.gif'
import carSlow2 from '../static/img/car_slow2.gif'
import carNormal from '../static/img/car_normal.gif'
import carSpeed1 from '../static/img/car_speed1.gif'
import carSpeed2 from '../static/img/car_speed2.gif'
const gravityF = 9.8
class _Simulator {
    constructor() {
        this.engineForce = INITIAL_FORCE
        /**
         * @description 1 is from the back -1 is from upfront
         */
        this.carMass = INITIAL_CAR_MASS
        this.airDirection = INITIAL_AIR_DIRECTION
        this.airForce = INITIAL_AIR_FORCE
        this.groundMu = INITIAL_WHEEL_FRICTION
        this.wheelRotation = INITIAL_WHEEL_ROTATION
        this.expectedVelocity = INITIAL_EXPECTED_VELOCITY
        this.slopeOfTheRoute = 0
        // this.carSlow2 = carSlow2
        // this.carSlow1 = carSlow1
        // this.carNormal = carNormal
        // this.carSpeed1 = carSpeed1
        // this.carSpeed2 = carSpeed2
        this.speed = INITIAL_EXPECTED_VELOCITY
    }


    getCurrentAceleration = () => {
        const baseA = this.engineForce
        const frictionForce = this.groundMu + this.wheelRotation
        const airForce = this.airForce * this.airDirection
        return (baseA + frictionForce + airForce) / this.carMass
    }

    getGif = () => {
        // if (this.getSpeed() < this.expectedVelocity * 0.5) {
        //     return carSlow2
        // }
        // if (this.getSpeed() < this.expectedVelocity * 0.75) {
        //     return carSlow1
        // }
        // if (this.getSpeed() > this.expectedVelocity * 0.90
        //     || this.getSpeed() < this.expectedVelocity * 1.10) {
        //     return carNormal
        // }
        // if (this.getSpeed() < this.expectedVelocity * 1.5) {
        //     return carSpeed1
        // }
        // return carSpeed2
        if (this.getSpeed() < this.expectedVelocity) {
            return carSlow2
        }
        if (this.getSpeed() === this.expectedVelocity) {
            return carNormal
        }
        if (this.getSpeed() > this.expectedVelocity) {
            return carSpeed1
        }
        return carSpeed2

    }

    getSlopeOfTheRouteAcc = () => {
        if (this.slopeOfTheRoute === 0) {
            return 0
        }
        const accelerationForce = this.carMass * gravityF * Math.cos(this.slopeOfTheRoute) * this.groundMu
        if (this.slopeOfTheRoute > 0) {
            return -1 * accelerationForce
        }
        if (this.slopeOfTheRoute < 0) {
            return accelerationForce
        }
    }

    getgroundMuAcceleration = () => {
        const Ffriction = (2 * this.carMass * gravityF * this.groundMu / 4)
        return -1 * (Ffriction / this.carMass) + this.getSlopeOfTheRouteAcc()
    }

    getWindAcceleration = () => {
        const windForce = this.airForce / this.carMass
        let direction = -1
        if (this.airDirection === "rear") {
            direction = 1
        }
        return windForce * direction
    }

    getCurrentAcceleration = () => {
        const carAcceleration = this.engineForce / this.carMass
        return this.getgroundMuAcceleration() + this.getWindAcceleration() + carAcceleration
    }

    getNeededEngineForce = () => {
        const neededSpeed = this.expectedVelocity - this.speed
        console.log("neededSpeed: ", neededSpeed)
        const externalAcceleration = this.getgroundMuAcceleration() + this.getWindAcceleration()
        let neededAcceleration = neededSpeed - externalAcceleration
        if (neededSpeed === 0) {
            this.engineForce = externalAcceleration * this.carMass * -1
            return 0
        }

        const currentEngineAcceleration = this.engineForce / this.carMass
        // if (Math.abs(neededAcceleration) > 0 && Math.abs(neededAcceleration) < (2 + currentEngineAcceleration)) {
        // speed turns into acceleration for 1 second
        return neededAcceleration * this.carMass - this.engineForce
        // }
        // if (neededAcceleration > 0) {
        //     console.log(" this.getCurrentAcceleration(): " , this.getCurrentAcceleration())
        //     return (2 + this.engineForce / this.carMass) * this.carMass - this.engineForce
        // }
        // return (-2 +  this.engineForce / this.carMass) * this.carMass - this.engineForce
    }

    getSpeed = () => {
        return this.speed
    }

}

//Singleton
const simulator = new _Simulator();
export default simulator;