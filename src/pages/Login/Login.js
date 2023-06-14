import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../components/Header/logo-no-background.png";
import { useSelector, useDispatch } from 'react-redux';
import { loginInitiate } from '../../redux/actions';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const{user} = useSelector((state) =>state.data);
    
    let dispatch = useDispatch();
    let history = useNavigate();
    
    useEffect(()=>{
        if(user){
            history("/");
        }
    },[user,dispatch]);

    const signIn = (e) => {
        e.preventDefault();
        dispatch(loginInitiate(email, password));
        setEmail("");
        setPassword("");
    }
    
    return (
        <div className='login'>
            <Link to='/'>
                <img src={Logo} className='login-logo' alt='logo'></img>
            </Link>
            <div className='login-container'>
                <h1>Sign in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                </form>
                <button type='submit' onClick={signIn} className='login-signIn'>
                    Sign In
                </button>
                <p>By continuing, you agree to E-COMMERCE's Conditions of Use and Privacy Notice.</p>
            </div>
            <p>New to E-COMMERCE ?</p>
            <Link to="/register">
                <button className='login-register'>Create Your E-COMMERCE Account</button>
            </Link>
        </div>
    )
}

export default Login