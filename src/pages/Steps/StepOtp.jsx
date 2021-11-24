import React from 'react'
import {Button} from "../../components/shared/Button/button";

export const StepOtp = ({onNext}) => {

    return (
        <div>
            <div>Otp</div>
            <Button onClick={onNext}>Next</Button>
        </div>
    )
}
