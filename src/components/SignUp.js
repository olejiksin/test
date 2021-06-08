// import {Component} from 'react';
import {Link} from "react-router-dom";
import React from "react";
import axios from "axios";

const {useReducer} = React;


function reduc(state, action) {
    switch (action.type) {
        case 'user': {
            return {
                ...state, username: action.payload
            }
        }
        case 'pass': {
            return {
                ...state, password: action.payload
            }
        }
        default: {
            return {...state}
        }
    }
}

export default function SignUp() {
    const initialState = {
        username: '',
        password: ''
    };
    const [state, dispatch] = useReducer(reduc, initialState);

    function submit() {
        const {username, password} = state;
        let data = {
            login: username,
            password: password
        };
        axios.post(`/signUp/`, data)
            .then(() => {
            })
            .catch((err) => {
                console.log(err);
                alert("Alarm")
            });
    }

// render(){
    return (
        <div className={'login'}>
            <label className={'log-label'}>Username</label>
            <br/>
            <input className={'text-input'} type={'text'} name={"username"} id={"username"}
                   onChange={(event) => dispatch({type: 'user', payload: event.target.value})}/>
            <label className={'log-label'}>Password</label>
            <br/>
            <input className={'text-input'} type={'password'} name={"password"} id={"password"}
                   onChange={(event) => dispatch({type: 'pass', payload: event.target.value})}/>
            <Link className={"log-reg-btn"} style={{float: 'right'}} onClick={() => submit()} to={"/login/"}>Reg</Link>
        </div>);
}

// }
