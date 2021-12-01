import React, {useEffect, useState} from 'react'
import {Button} from "../../components/shared/Button/button";
import {Card} from "../../components/shared/Card/card";
import {TextInput} from "../../components/shared/TextInput/TextInput";
import {useDispatch, useSelector} from "react-redux";
import {setAvatar} from "../../store/activateSlice";
import './Steps.css'
import {activate} from "../../http";
import {setAuth} from "../../store/authSlice";
import {Loader} from "../../components/shared/Loader/Loader";

export const StepAvatar = ({onNext}) => {
    const dispatch = useDispatch();
    const {name, avatar} = useSelector((state) => state.activate)
    const [image, setImage] = useState('/images/monkey-avatar.png');
    const [loading, setLoading] = useState(false);
    const [unMount, setUnMount] = useState(false);

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
        if (!name || !avatar) return;
        setLoading(true);
        try {
            const {data} = await activate({name, avatar});
            if (data.auth) {
                if (!unMount) {
                    dispatch(setAuth(data));
                }
            }
            console.log(data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        return () => {
            setUnMount(true);
        }
    }, [])

    if (loading) return <Loader message="Activation progress"/>
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
