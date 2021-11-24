import React from 'react'
import {Button} from "../../components/shared/Button/button";

export const StepPhoneEmail = ({onNext}) => {

    return (
        <div>
            <div>Phone and Email</div>
            <Button onClick={onNext}>Next</Button>
        </div>
    )
}
