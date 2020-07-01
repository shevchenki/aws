import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            hostname: ""
        };
    }

    componentDidMount() {
        this.getTodos();
        this.getHostname();
    }

    getTodos() {
        axios
            .get('http://13.231.119.232:8000/api/')
            .then(res => {
                this.setState({ todos: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    getHostname() {
        axios
            .get('http://13.231.119.232:8000/api/hostname/')
            .then(res => {
                this.setState({ hostname: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                {this.state.todos.map(item => (
                    <div key={item.id}>
                        <h2>{item.title}</h2>
                        <p className="item_body">{item.body}</p>
                    </div>
                ))}

                <div className="box30">
                    <div className="box-title">HOSTNAME 2</div>
                    <p>{this.state.hostname.hostname}</p>
                </div>
            </div>
        );
    }
}

export default App;
