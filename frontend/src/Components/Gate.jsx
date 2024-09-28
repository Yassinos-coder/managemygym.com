import { useState } from "react";
import '../assets/css/gate.css';
import { useDispatch } from 'react-redux';
import { Login, Signup } from "../redux/UserReducer";
import UserObject from "../Models/UserObject";
import { useNavigate } from "react-router-dom";

function Gate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [action, setAction] = useState('login');
    const [loginData, setLoginData] = useState({});
    const [newUser, setNewUser] = useState(new UserObject());

    const TriggerLogin = () => {
        if (!loginData.email || !loginData.password) {
            alert('Fields can\'t be empty');
        } else {
            dispatch(Login({ loginData })).then((data) => {
                console.log('frt', data.payload)
                if (data.payload.message === 'ACCESS_GRANTED') {
                    localStorage.setItem('token', data.payload.token)
                    localStorage.setItem('user_access_status', 'true')
                    localStorage.setItem('uuid', data.payload.userData._id)
                    navigate(`/dashboard/${localStorage.getItem('uuid')}`)
                }
            })

        }
    };

    const TriggerSignup = () => {
        dispatch(Signup({ newUser })).then(() => {
            // Additional signup logic (if needed)
        });
    };

    return (
        <div className='Gate'>
            <div className="gateBox">
                <div className="gateBoxHeader">
                    <button
                        onClick={() => { setAction('signup'); }}
                        className='btnPreset btnSignup'
                        style={action === 'signup' ? { borderBottom: '2px solid blue' } : {}}
                    >
                        Sign Up
                    </button>
                    <button
                        onClick={() => { setAction('login'); }}
                        className='btnPreset btnSignin'
                        style={action === 'login' ? { borderBottom: '2px solid blue' } : {}}
                    >
                        Log In
                    </button>
                </div>

                {action === 'login' ? (
                    <div className="login">
                        <div className="inputContainer">
                            <input className='input email' type="text" autoComplete="off" placeholder='Enter email'
                                onChange={(e) => setLoginData({ ...loginData, email: e.currentTarget.value })} />
                            <input className='input password' type="password" autoComplete="off" placeholder='Enter password'
                                onChange={(e) => setLoginData({ ...loginData, password: e.currentTarget.value })} />
                            <a href="" className="resetPassword">Reset your password?</a>
                            <button onClick={TriggerLogin} className="loginBtn">SIGN IN</button>

                            <div className="privacy-tos">
                                <p>
                                    By logging in, you agree to our
                                    <a href="/terms-of-service" target="_blank">Terms of Service</a> and
                                    <a href="/privacy-policy" target="_blank">Privacy Policy</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="signup">
                        <div className="SignupinputContainer">
                            <div className="fnLn">
                                <input type="text" placeholder="Enter firstname"
                                    onChange={(e) => setNewUser({ ...newUser, firstname: e.currentTarget.value })} />
                                <input type="text" placeholder="Enter lastname"
                                    onChange={(e) => setNewUser({ ...newUser, lastname: e.currentTarget.value })} />
                            </div>
                            <input type="email" className="input" placeholder="Enter email"
                                onChange={(e) => setNewUser({ ...newUser, email: e.currentTarget.value })} />
                            <input type="password" className="input" placeholder="Enter password"
                                onChange={(e) => setNewUser({ ...newUser, password: e.currentTarget.value })} />
                            <input type="tel" className="input" placeholder="Enter phonenumber"
                                onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.currentTarget.value })} />
                            <select className="input select" name="userRole" id="userRole"
                                onChange={(e) => setNewUser({ ...newUser, userRole: e.currentTarget.value })}>
                                <option value='blank'>What{"'"}s your role in your gym?</option>
                                <option value='owner'>Gym Owner</option>
                                <option value='gym_employee'>Employee at the gym</option>
                            </select>
                            <button onClick={TriggerSignup} className="loginBtn">SIGN UP</button>

                            <div className="privacy-tos">
                                <p>
                                    By signing up, you agree to our
                                    <a href="/terms-of-service" target="_blank">Terms of Service</a> and
                                    <a href="/privacy-policy" target="_blank">Privacy Policy</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Gate;
