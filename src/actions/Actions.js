import axios from 'axios';
import {
    ADD_COPY_INSTANCE,
    ADD_INSTANCE, DELETE_APP, DELETE_SERVICE,
    ERROR, LOGOUT, NEW_INSTANCE,
    START_SERVICE,
    STOP_INSTANCE,
    SUCCESS,
    SUCCESS_AUTH
} from "../types/types";

export const addOneInstance = (name, git, path) => {
    let data = {
        gitUrl: git,
        instanceUrl: path,
        instanceName: name,
        appId: localStorage.getItem('id'),
        userId: localStorage.userId
    };
    document.getElementById('new').style.display = 'none';
    return dispatch => {
        axios.post(`/applications/new/${data.userId}`, data, {headers: {Authorization: JSON.parse(localStorage.token).value}})
            .then((response) => {
                response.data.id = localStorage.getItem('id') ;
                dispatch(newInstance(response.data));
            })
            .catch((er) => {
                dispatch(Error(er.message))
            });
    };
};

export const logout = () => {
    // localStorage.userId = null;
    // localStorage.username = null;
    // localStorage.token = null;
    localStorage.clear();
    return dispatch => {
        dispatch(logOut);
    };
};
export const deleteApp = (appId) => {
    let data={id:appId};
    return dispatch => {
        axios.delete(`/applications/${appId}`, {headers: {Authorization: JSON.parse(localStorage.token).value}})
            .then(() => {
                dispatch(delApp(data))
            })
            .catch((er) => {
                dispatch(Error(er.message))
            });
    };
};

export const logIn = (username, password) => {
    localStorage.username = username;
    localStorage.services = [];
    console.log(localStorage);
    let data = {
        login: username,
        password: password
    };
    return dispatch => {
        axios.post(`/login`, data,)
            .then((response) => {
                data.token = response.data;
                dispatch(SuccessAuth(data));
                let token = {"status": data.token.status, "userId": data.token.userId, "value": data.token.value};
                localStorage.token = ("token", JSON.stringify(token));
                localStorage.userId = data.token.userId;

            })
            .catch((error) => {
                dispatch(Error(error))
            });
    };
};

export const getServices = (userid) => {
    return dispatch => {
        if(JSON.parse(localStorage.token)!==null) {
            axios.get(`/applications/${userid}`, {headers: {Authorization: JSON.parse(localStorage.token).value}})
                .then(response => {
                    dispatch(SuccessActive(response.data));
                    localStorage.services = response.data;
                })
                .catch(error => {
                    dispatch(Error(error.message))
                });
        }
    };
};

export const addCopyOfInstance = (data) => {
    return dispatch => {
        axios.post(`/applications`, data, {headers: {Authorization: JSON.parse(localStorage.token).value}})
            .then((response) => {
                dispatch(copyOfInstance(response.data))
            })
            .catch(error => {
                dispatch(Error(error.message));
            });
    };
};
export const addNewApp = (git, username) => {
    let hd = JSON.parse(localStorage.token).value;
    let data = {
        gitUrl: git,
        ownerName: username,
        type: 'docker-compose'
    };
    return dispatch => {
        let id = null;
        axios.post(`/applications`, data, {headers: {Authorization: hd}})
            .then((response) => {
                id = response.data.id;
                dispatch(newApp(response.data));
                setTimeout(() => {
                    axios.put(`/applications/${id}`, null, {headers: {Authorization: hd}})
                        .then((response) => {
                        })
                        .catch((error) => dispatch(Error(error.message)));
                }, 1000);
            })
            .catch((error) => {
                dispatch(Error(error.message));
            });
    };
};
export const deleteService = (instanceId) => {
    let data = {
        instanceId: instanceId
    };
    return dispatch => {
        axios.delete(`/applications/${instanceId}`, {headers: {Authorization: JSON.parse(localStorage.token).value}})
            .then(() => {
                dispatch(deleteServ(data))
            })
            .catch((error) => {
                dispatch(Error(error.message));
            });
    };
};
export const stopService = (instanceId) => {
    let data = {
        instanceId: instanceId
    };
    return dispatch => {
        axios.put(`/applications/stop/${instanceId}`, null, {headers: {Authorization: JSON.parse(localStorage.token).value}})
            .then(() => {
                dispatch(stopServ(data))
            })
            .catch((error) => {
                dispatch(Error(error.message));
            });
    };
};
export const startService = (instanceId) => {
    let data = {
        instanceId: instanceId
    };
    return dispatch => {
        axios.put(`/applications/start/${instanceId}`, null, {headers: {Authorization: JSON.parse(localStorage.token).value}})
            .then(() => {
                dispatch(startServ(data))
            })
            .catch((error) => {
                dispatch(Error(error.message));
            });
    }
};
export const newInstance = (data) => {
    return {
        type: NEW_INSTANCE,
        payload: {
            ...data
        }
    }
};
export const delApp = (data) => {
    return {
        type: DELETE_APP,
        payload: {
            ...data
        }
    }
};
export const logOut = () => {
    return {
        type: LOGOUT,
        payload: {}
    }
};
export const deleteServ = (data) => {
    return {
        type: DELETE_SERVICE,
        payload: {
            ...data
        }
    }
}
export const startServ = (data) => {
    return {
        type: START_SERVICE,
        payload: {
            ...data
        }
    }
};
export const copyOfInstance = (data) => {
    return {
        type: ADD_COPY_INSTANCE,
        payload: {
            ...data
        }
    }
};
export const newApp = (data) => {
    return {
        type: ADD_INSTANCE,
        payload: {
            ...data
        }
    }
};
export const stopServ = (data) => {
    return {
        type: STOP_INSTANCE,
        payload: {
            ...data
        }
    }
};
export const SuccessAuth = (data) => {
    return {
        type: SUCCESS_AUTH,
        payload: {
            ...data
        }
    }
};
export const SuccessActive = (data) => {
    return {
        type: SUCCESS,
        payload: {
            ...data
        }
    }
};

export const Error = (error) => {
    return {
        type: ERROR,
        payload: {error}
    };
};
