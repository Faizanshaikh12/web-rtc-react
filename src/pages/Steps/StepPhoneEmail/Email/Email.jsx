import React, {useState} from 'react'
import {Button} from "../../../../components/shared/Button/button";
import {Card} from "../../../../components/shared/Card/card";
import {TextInput} from "../../../../components/shared/TextInput/TextInput";

export const Email = ({onNext}) => {
const [email, setEmail] = useState('')
    return (
        <Card title='Enter your email id' icon='email-emoji.png'>
            <TextInput value={email} onChange={(e) => setEmail(e.target.value)}/>
            <div>
                <div className='actionButtonWrap'>
                    <Button text="Next"/>
                </div>
                <p className='bottomPre'>
                    It is a long established fact that a reader will be distracted by the readable content of a page
                </p>
            </div>
        </Card>
    )
}
