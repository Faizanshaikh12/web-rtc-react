import React, {useState} from 'react'
import {Phone} from "./Phone/Phone";
import {Email} from "./Email/Email";
import '../Steps.css'

const phoneEmailMap = {
    phone: Phone,
    email: Email,
}

export const StepPhoneEmail = ({onNext}) => {
    const [type, setType] = useState('phone')
    const Component = phoneEmailMap[type]

    return (
        <div>
            <div className='cardWrapper'>
                <div>
                    <div className='buttonWrap'>
                        <button className={`tabButton ${type === 'phone' ? 'active' : ''}`} onClick={() => setType('phone')}>
                            <img src='/images/phone-white.png' alt='Phone'/>
                        </button>
                        <button className={`tabButton ${type === 'email' ? 'active' : ''}`} onClick={() => setType('email')}>
                            <img src='/images/mail-white.png' alt='Email'/>
                        </button>
                    </div>
                    <Component onNext={onNext}/>
                </div>
            </div>
        </div>
    )
}
