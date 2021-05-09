import {Component} from 'react';
import React from "react";

export default class Services extends Component {
    render() {
        const {stopService, addCopyOfInstance, startService, deleteService, services, deleteApp} = this.props;
        // if (services) {
        const serv = services.map((service, index) =>
            <tbody key={index}>
            {service.instance[0] !== undefined ? (service.instance.map((ins, index) =>
                    <tr key={index}>
                        <td className={'td-td'}>{service.gitUrl}</td>
                        <td>{ins.instanceName}</td>
                        <td>{ins.instanceUrl}</td>
                        {ins.status === 'active' ? <td style={{color: 'green'}}>{ins.status}</td> :
                            <td style={{color: 'darkred'}}>{ins.status}</td>}
                        <td>
                            <button className={'btn'} onClick={() => addCopyOfInstance(ins)}>Add copy</button>
                        </td>
                        {ins.status === 'active' ?
                            <td>
                                <button className={'btn'} style={{color: 'darkred'}}
                                        onClick={() => stopService(ins.instanceId)}>Stop instance
                                </button>
                            </td>
                            :
                            <td>
                                < button className={'btn'} style={{color: 'green'}}
                                         onClick={() => startService(ins.instanceId)}>Start instance
                                </button>
                            </td>}
                        <td>
                            <button className={'btn'} style={{height: '50px'}}
                                    onClick={() => deleteService(ins.instanceId)}>Delete instance
                            </button>
                        </td>
                        <td>
                            <button className={'btn'} onClick={() => deleteApp(service.id)}>Delete app
                            </button>
                        </td>
                        <td>
                            <button className={'btn'} style={{height: '50px'}} onClick={() => {
                                document.getElementById("new").style.display = 'block';
                                localStorage.setItem('id', service.id)
                            }}>Add new instance
                            </button>
                        </td>
                    </tr>))
                :
                (<tr>
                    <td className={'td-td'}>{service.gitUrl}</td>
                    <td/>
                    <td/>
                    <td>Runnin</td>
                    <td>
                        <button className={'btn'} onClick={() => deleteApp(service.id)}>Delete app
                        </button>
                    </td>
                    <td>
                        <button className={'btn'} style={{height: '50px'}} onClick={() => {
                            document.getElementById("new").style.display = 'block';
                            localStorage.setItem('id', service.id)
                        }}>Add new instance
                        </button>
                    </td>
                </tr>)}
            </tbody>);
        return (
            <div>
                <table className={'table'}>
                    <thead>
                    <tr>
                        <td>GitHub URL</td>
                        <td>Instance name</td>
                        <td>Instance url</td>
                        <td>Instance status</td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button className={'btn-stop btn'}
                            >Stop instance
                            </button>
                        </td>
                        <td>
                            < button className={'btn btn-start'}
                            >Start instance
                            </button>
                        </td>
                        <td>
                            <button className={'btn'} style={{height: '50px'}}>Delete instance
                            </button>
                        </td>
                        <td>
                            <button className={'btn'}>Delete app
                            </button>
                        </td>
                    </tr>
                    </thead>
                    {serv}
                </table>
            </div>
        );
    }
}
