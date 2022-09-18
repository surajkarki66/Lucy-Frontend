import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router';
import { SIGNUPAPI } from '../../Constants/ApiConstants';
import jwt from 'jwt-decode'
import { toast } from 'react-toastify';
import Spinner from '../../Loaders/Spinner';
import { axiosMethod } from '../../Api/Post';
 

const Signup = (props) => {
    const [email , setEmail] = useState("");
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [password, setPassword] = useState("");

    // Handler 
    const emailHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const first_nameHandler = (event) => {
        setfirst_name(event.target.value);
    }

    const last_nameHandler = (event) => {
        setlast_name(event.target.value);
    }

    const submitHandler = async() => {
        const data = {
            email, 
            first_name,
            last_name, 
            password
        }
        axiosMethod({url: SIGNUPAPI, data: data, method: 'post'})
    }
    
    const [isAdmin, setIsAdmin ] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
        const token = localStorage.getItem('tokan')
        let user;
        if(token) user = jwt(token)
        if(user?.role === 'admin') setIsAdmin(true)
        setIsLoading(false)
    }, [])

    if(!isAdmin && !isLoading){
        toast.warning('Unauthorized!',)
        return (
            <Navigate to='/' />
        )
    }
    else if (isLoading){
        return <Spinner />
    }else {
        // HTML file to show to the user 
    return (
        <div className="Container">
            <div class="form-container sign-in-container">
                <div className="form">
                    <h1>Sign Up</h1>
                    <input type="text" placeholder="First Name" onChange={first_nameHandler}/>
                    <input type="text" placeholder="Last Name" onChange={last_nameHandler}/>
                    <input type="email" placeholder="Email" onChange={emailHandler}/>
                    <input type="password" placeholder="Password"  onChange={passwordHandler} />
                    <button onClick={submitHandler}>Sign Up</button>
                </div>
        </div>
    </div>
    )
    }

};

export default Signup;