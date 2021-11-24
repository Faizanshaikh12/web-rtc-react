import React from 'react'
import {Button} from "../../components/shared/Button/button";

export const StepUsername = ({onNext}) => {

    return (
        <div>
            <div>UserName</div>
            <Button onClick={onNext}>Next</Button>
        </div>
    )
}
