import React, {Component} from 'react';
import Services from '../components/Services.js';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

import {
    addCopyOfInstance,
    addNewApp, addOneInstance, deleteApp,
    deleteService,
    getServices, logout,
    startService,
    stopService
} from "../actions/Actions";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: null,
            github: null,
            gitInstance: null,
            instanceName: null,
            instancePath: null
        }
    }

    componentDidMount() {
        setTimeout(() => {
            const {getServices, userId} = this.props;
            if (userId !== 0 && userId !== null && userId !== undefined && JSON.parse(localStorage.token)!==null) {
                getServices(userId);
            }
        }, 2000)
    }

    render() {
        const EMPTY=[];
        const {stopService, username, addNewApp, services, addCopyOfInstance, startService, deleteService, logout, deleteApp, addOneInstance} = this.props;
        const {instanceName, gitInstance, instancePath} = this.state;
        return (
            <div>
                <div>
                    <Link className={'btn'}  to='/login/' onClick={() => logout()}>Exit</Link>
                    <Link className={'btn'} to='/signUp/'>Registration</Link>
                </div>
                <br/>
                <div className={'newInstanceWin'}>
                    <label>GitHub link </label>
                    <input className={'text-input'} style={{height: '25px', width: '80%', margin: '5px 5px '}}
                           required={true} onChange={(event) => this.setState({github: event.target.value})}
                           type={"text"}
                           name={'project-link'} id={'project-link'}/>
                    <button className={'btn'} style={{width: '80%'}}
                            onClick={() => addNewApp(this.state.github, username)}>Add new app
                    </button>
                </div>
                <div className={'reg'} id={'new'}>
                    <label>GitUrl</label>
                    < input className={'text-input'} required={true} type={'text'} name={'instance-link'}
                            onChange={(event) =>
                                this.setState({gitInstance: event.target.value})
                            }/>
                    <label>Name for instance</label>
                    < input className={'text-input'} required={true} type={'text'} name={'instance-name'}
                            onChange={(event) =>
                                this.setState({instanceName: event.target.value})
                            }/>
                    <label>Instance mainpath(host:port/(mainpath))</label>
                    < input className={'text-input'} required={true} type={'text'} name={'instance-url'}
                            onChange={(event) =>
                                this.setState({instancePath: event.target.value})
                            }/>
                    <button className={'btn'} style={{width: '65px'}}
                            onClick={() => document.getElementById('new').style.display = 'none'
                            }>Close
                    </button>
                    <button className={'btn btn-add'} onClick={() =>
                        addOneInstance(instanceName, gitInstance, instancePath)}>Add
                    </button>
                </div>
                <br/>
                <Services username={username} services={services || EMPTY} stopService={stopService}
                          addCopyOfInstance={addCopyOfInstance} startService={startService}
                          deleteService={deleteService} deleteApp={deleteApp}/>
            </div>
        )
    }
}

Profile.propsType={
  username: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired
};

const mapStateToProps = store => {
    return {
        userId: store.userId,
        token: store.token,
        username: store.username,
        services: store.services
    }
};
const mapDispatchToProps = dispatch => ({
    addOneInstance: (name, git, path) => {
        dispatch(addOneInstance(name, git, path))
    },
    deleteApp: (appId) => {
        dispatch(deleteApp(appId))
    },
    logout: () => {
        dispatch(logout())
    },
    addNewApp: (git, user) => {
        dispatch(addNewApp(git, user))
    },
    getServices: (userId) => {
        dispatch(getServices(userId))
    },
    stopService: (instanceId) => {
        dispatch(stopService(instanceId))
    },
    addCopyOfInstance: (data) => {
        dispatch(addCopyOfInstance(data))
    },
    startService: (instanceId) => {
        dispatch(startService(instanceId))
    },
    deleteService: (instanceId) => {
        dispatch(deleteService(instanceId))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
