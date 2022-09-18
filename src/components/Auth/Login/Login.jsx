import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate} from 'react-router-dom';
import jwt from 'jwt-decode'

import '../Auth.css';
import { LOGINAPI } from '../../Constants/ApiConstants';
import { toast } from 'react-toastify';
import { ADMINDASHBOARD } from '../../Constants/RoutesConstants';
import Spinner from '../../Loaders/Spinner';

const Login = (props) => {
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    // Handler 
    const emailHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const submitHandler = () => {
        const data = {
            email, 
            password
        }
        axios.post(LOGINAPI, data, {withCredentials: true})
            .then(response => {
                localStorage.setItem('tokan', response?.data?.access_token)
                const user = jwt(response?.data?.access_token)
                if(user?.role === 'admin'){
                    navigate('/admin')
                } else {
                    toast.error('Authorization Admin Failed!')
                }
                //Set in localstorage or cookies
                
            })
            .catch(error => console.log(error.message));
    }
    const [isLogedIn, setisLogedIn ] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
        const token = localStorage.getItem('tokan')
        let user;
        if(token) user = jwt(token)
        if(user?.role === 'admin') setisLogedIn(true)
        setIsLoading(false)
    }, [])

    if(isLogedIn){
        return (
            <Navigate to={ADMINDASHBOARD} />
        )
    }
    else if (isLoading){
        return <Spinner />
    }
    else {
        // HTML file to show to the user 
        return (
            <div className="Container">
                <div class="form-container sign-in-container">
                    <div className="form">
                        <h1>Login</h1>
                        <input type="email" placeholder="Email" onChange={emailHandler}/>
                        <input type="password" placeholder="Password"  onChange={passwordHandler} />
                        <a href="#">Forgot your password?</a>
                        <button onClick={submitHandler}>Login</button>
                    </div>
                </div>
            </div>
        )
    }

};


export default Login;