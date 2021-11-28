import React, {useState} from 'react'
import {Card} from "../../../../components/shared/Card/card";
import {Button} from "../../../../components/shared/Button/button";
import {TextInput} from "../../../../components/shared/TextInput/TextInput";
import {sendOtp} from '../../../../http/index';
import '../../Steps.css'
import {useDispatch} from "react-redux";
import {setOtp} from "../../../../store/authSlice";

export const Phone = ({onNext}) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const dispatch = useDispatch();

    async function onSubmit() {
        // Server Request
        const {data} = await sendOtp({phone: phoneNumber});
        console.log(data)
        dispatch(setOtp({phone: data.phone, hash: data.hash}))

        onNext()
    }

    return (
        <Card title='Enter your phone number' icon='phone.png'>
            <TextInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            <div>
                <div className='actionButtonWrap'>
                    <Button text="Next" onClick={onSubmit}/>
                </div>
                <p className='bottomPre'>
                    It is a long established fact that a reader will be distracted by the readable content of a page
                </p>
            </div>
        </Card>
    )
}
