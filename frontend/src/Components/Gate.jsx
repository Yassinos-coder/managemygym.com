import { useState } from "react";
import '../assets/css/gate.css'
import { useDispatch } from 'react-redux'
import { Login } from "../redux/UserReducer";
function Gate() {
    const dispatch = useDispatch()
    const [action, setAction] = useState('login')
    const [loginData, setLoginData] = useState({})

    const TriggerLogin = () => {
        if (!loginData.email || !loginData.password) {
            alert('Fields can\'t be empty');
        } else {
            console.log(loginData)
            dispatch(Login(loginData))
                .then(data => {
                    // Handle successful login here
                    console.log('Login successful:', data);
                })
                .catch((err) => console.error('Login error:', err.message));
        }
    };


    return (
        <div className='Gate'>
            <div className="gateBox">
                <div className="gateBoxHeader">
                    <button
                        onClick={() => { setAction('signup') }}
                        className='btnPreset'
                        style={action === 'signup' ? { borderBottom: '2px solid blue' } : {}}
                    >
                        Sign Up
                    </button>
                    <button onClick={() => { setAction('login') }} className='btnPreset' style={action === 'login' ? { borderBottom: '2px solid blue' } : {}}>Log In</button>
                </div>

                {
                    action === 'login' ? (
                        <div className="login">
                            <div className="inputContainer">
                                <input className='input email' type="text" required={true} autoComplete="off" placeholder='Enter email' onChange={(e) => setLoginData({ ...loginData, email: e.currentTarget.value })} />
                                <input className='input password' type="password" required={true} autoComplete="off" placeholder='Enter password' onChange={(e) => setLoginData({ ...loginData, password: e.currentTarget.value })} />
                                <a href="" className="resetPassword">Reset your password ?</a>
                                <button onClick={TriggerLogin} className="loginBtn">SIGN IN</button>


                                <div className="privacy-tos">
                                    <p>
                                        By logging in, you agree to our
                                        <a href="/terms-of-service" target="_blank">Terms of Service</a>
                                        and
                                        <a href="/privacy-policy" target="_blank">Privacy Policy</a>.
                                    </p>
                                </div>
                            </div>
                        </div>

                    ) : (
                        <div className="signup">
                            <p>Sign up form here</p>
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default Gate;
