import React, {useState} from 'react'
import {Button} from "../../components/shared/Button/button";
import {Card} from "../../components/shared/Card/card";
import {TextInput} from "../../components/shared/TextInput/TextInput";
import {useDispatch, useSelector} from "react-redux";
import {setName} from "../../store/activateSlice";
import './Steps.css'

export const StepName = ({onNext}) => {
    const dispatch = useDispatch();
    const {name} = useSelector((state) => state.activate)
    const [fullName, setFullName] = useState(name);

    function nextStep() {
        if (!fullName) {
            return;
        }
        dispatch(setName(fullName));
        onNext();
    }

    return (
        <div>
            <div className='cardWrapper'>
                <Card
                    title="what's your full name?"
                    icon="goggle-emoji.png"
                >
                    <TextInput
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <p className='bottomPre'>
                        People use real names at codershouse :)!
                    </p>
                    <div className='actionButtonWrap'>
                        <Button text='Next' onClick={nextStep}/>
                    </div>
                </Card>
            </div>
        </div>
    )
}
