import React from 'react'
import './Home.css'
import {useHistory} from "react-router-dom";
import {Card} from "../../components/shared/Card/card";
import {Button} from "../../components/shared/Button/button";

export const Home = () => {
const history = useHistory()
    function startRegister() {
        history.push('/authenticate')
    }

    return (
        <div className='cardWrapper'>
            <Card title='Welcome to Codehouse!' icon='logo.png'>
                <p className='text'>
                    It is a long established fact that a reader will be distracted by the readable content of a page
                    when
                    looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                    distribution.
                </p>
                <div>
                    <Button onClick={startRegister} text="Let's Go"/>
                </div>
                <div className='loginWrapper'>
                    <span className='hasInvite'>Have an invite text?</span>
                </div>
            </Card>
        </div>
    )
}
