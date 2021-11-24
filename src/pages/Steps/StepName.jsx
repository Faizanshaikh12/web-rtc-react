import React from 'react'
import {Button} from "../../components/shared/Button/button";

export const StepName = ({onNext}) => {

    return (
        <div>
            <div>Name</div>
            <Button onClick={onNext}>Next</Button>
        </div>
    )
}
