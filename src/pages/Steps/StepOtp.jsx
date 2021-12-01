import React, {useState} from 'react'
import {Card} from "../../components/shared/Card/card";
import {TextInput} from "../../components/shared/TextInput/TextInput";
import {Button} from "../../components/shared/Button/button";
import {verifyOtp} from "../../http";
import {useDispatch, useSelector} from "react-redux";
import {setAuth} from "../../store/authSlice";
import './Steps.css'

export const StepOtp = () => {
    const [otp, setOtp] = useState('')
    const {phone, hash} = useSelector((state) => state.auth.otp);
    const dispatch = useDispatch();

    async function onSubmit() {
        if(!otp || !phone || !hash) return;
        try {
            const {data} = await verifyOtp({otp, phone, hash});
            dispatch(setAuth(data))
        } catch (err) {
            console.log(err)
        }
    }

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
                        <Button onClick={onSubmit} text='Next'/>
                    </div>
                </Card>
            </div>
        </div>
    )
}
