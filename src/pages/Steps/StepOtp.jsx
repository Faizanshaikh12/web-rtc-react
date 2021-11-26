import React, {useState} from 'react'
import {Card} from "../../components/shared/Card/card";
import {TextInput} from "../../components/shared/TextInput/TextInput";
import {Button} from "../../components/shared/Button/button";
import './Steps.css'

export const StepOtp = ({onNext}) => {
    const [otp, setOtp] = useState('')

    return (
        <div>
            <div className='cardWrapper'>
                <Card
                    title="Enter the code  we just texted you"
                    icon="lock-emoji.png"
                >
                    <TextInput
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <div className='actionButtonWrap'>
                        <Button onClick={onNext} text='Next'/>
                    </div>
                </Card>
            </div>
        </div>
    )
}
