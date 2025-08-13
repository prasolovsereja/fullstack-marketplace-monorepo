'use client'

import {useEffect, useState} from "react";

const LoginPage = () => {
    const [deviceType, setDeviceType] = useState('unknown');

    useEffect(() => {
        const userAgent = navigator.userAgent;
        if (userAgent.match(/Android|Iphone|Ipod|Windows phone/i)) {
            setDeviceType('userPhone');
        } else if (userAgent.match(/Windows|Linux|Macintosh/i)) {
            setDeviceType('userPc');
        }
    }, []);
    return (
        <main className='container d-flex flex-column justify-content-center align-items-center vh-100'>
            <div className='card p-4 shadow-sm'>
                <h3 className='mb-3'>
                    С возвращением
                </h3>
                <form method="POST" action='/api/login'>
                    <div className='mb-3'>
                        <label className='form-label'>
                            E-mail
                        </label>
                        <input
                            type='email'
                            name='email'
                            className='form-control'
                            placeholder='Введите email'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>
                            Password
                        </label>
                        <input
                            type='password'
                            name='password'
                            className='form-control'
                            placeholder='Введите пароль'
                            required
                        />
                    </div>
                    <input type='hidden' name='deviceType' value={deviceType}/>
                    <div className='mb-3 btn-group'>
                        <button type='submit' className='btn btn-primary w-100'>
                            Войти
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}
export default LoginPage;