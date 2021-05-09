import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logIn} from "../actions/Actions";
import PropTypes from 'prop-types';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null
        }
    }

    render() {
        const {logIn} = this.props;
        const {username, password} = this.state;
        return (
            <div>
                <div className={'login'}>
                    <label className={'log-label'}>Name</label>
                    <input type={"text"} name={"username"} id={"username"} className={'text-input'}
                           onChange={(event) => this.setState({username: event.target.value})}/>
                    <br/>
                    <label className={'log-label'}>Password</label>
                    <input className={'text-input'} type={"password"}
                           onChange={(event) => this.setState({password: event.target.value})}
                           name={'password'}/>
                    <Link className={"log-reg-btn"} style={{float: 'right'}} onClick={() => logIn(username, password)}
                          to={`/applications`}> Next</Link>
                </div>
            </div>);
    }
}

Login.propsType = {
    logIn: PropTypes.func
};
const mapDispatchToProps = (dispatch) => ({
    logIn:(user,pass)=>dispatch(logIn(user,pass))
});
const mapStateToProps = (store) => {
    return {
        username: store.username
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
