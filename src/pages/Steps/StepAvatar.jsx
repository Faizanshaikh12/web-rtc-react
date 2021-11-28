import React, {useState} from 'react'
import {Button} from "../../components/shared/Button/button";
import {Card} from "../../components/shared/Card/card";
import {TextInput} from "../../components/shared/TextInput/TextInput";
import {useDispatch, useSelector} from "react-redux";
import {setAvatar} from "../../store/activateSlice";
import './Steps.css'
import {activate} from "../../http";

export const StepAvatar = ({onNext}) => {
    const dispatch = useDispatch();
    const {name, avatar} = useSelector((state) => state.activate)
    const [image, setImage] = useState('/images/monkey-avatar.png');

    function uploadImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setImage(reader.result);
            dispatch(setAvatar(reader.result));
        }
        console.log(e)
    }

    async function onSubmit() {
        try {
            const {data} = await activate({name, avatar});
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div>
            <div className='cardWrapper'>
                <Card
                    title={`Okay, ${name}!`}
                    icon="monkey-emoji.png"
                >
                    <p className='avatarPre'>
                        How's this photo?
                    </p>
                    <div className='avatarWrap'>
                        <img className='avatarImage' src={image} alt='avatar'/>
                    </div>
                    <div>
                        <input
                            id='avatarInput'
                            type='file'
                            hidden
                            onChange={uploadImage}
                        />

                    </div>
                    <label htmlFor='avatarInput' className='avatarLabel'>Choose a different photo</label>
                    <div className='actionButtonWrap'>
                        <Button text='Next' onClick={onSubmit}/>
                    </div>
                </Card>
            </div>
        </div>
    )
}
