import React, {useState} from 'react'
import './Login.css'
import {StepPhoneEmail} from "../Steps/StepPhoneEmail";
import {StepOtp} from "../Steps/StepOtp";
import {StepName} from "../Steps/StepName";
import {StepAvatar} from "../Steps/StepAvatar";
import {StepUsername} from "../Steps/StepUsername";

const steps = {
    1: StepPhoneEmail,
    2: StepOtp,
}

export const Login = () => {
    const [step, setStep] = useState(1)
    const Step = steps[step]

    function onNext(){
        setStep(step + 1)
    }

    return (
        <div>
            <Step onNext={onNext}/>
        </div>
    )
}
