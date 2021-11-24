import React from 'react'
import {Button} from "../../components/shared/Button/button";

export const StepAvatar = ({onNext}) => {

    return (
        <div>
            <div>Avatar</div>
            <Button onClick={onNext}>Next</Button>
        </div>
    )
}
