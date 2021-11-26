import React, {useState} from 'react'
import {Card} from "../../../../components/shared/Card/card";
import {Button} from "../../../../components/shared/Button/button";
import {TextInput} from "../../../../components/shared/TextInput/TextInput";
import '../../Steps.css'

export const Phone = ({onNext}) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    return (
        <Card title='Enter your phone number' icon='phone.png'>
            <TextInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            <div>
                <div className='actionButtonWrap'>
                    <Button text="Next" onClick={onNext}/>
                </div>
                <p className='bottomPre'>
                    It is a long established fact that a reader will be distracted by the readable content of a page
                </p>
            </div>
        </Card>
    )
}
