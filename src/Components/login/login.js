import React, {Component} from 'react';
import swat from "sweetalert2";
import axios from "axios";
import {Form, FormGroup, Label, Input } from 'reactstrap';


const RegisteredAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Logged In Successfully ',
        showConfirmButton: false,
        timer: 3000
    });
}

const RegisterFail = (res) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: res
    })
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            tempUN:'',
            roles:[],
            token:''
        
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    onValueChange(event) {
        this.setState({
            roles: [event.target.value]
        });
      }

    onSubmit(e) {
        e.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password,
           
        }
        console.log('DATA TO SEND', user);
        axios.post('http://localhost:8080/api/service/logIn', user)
            .then(response => {
                this.setState({
                    username: '',
                    password: '',
                    tempUN:response.data.username,
                    roles:response.data.roles,
                    token:response.data.tokenType +' '+ response.data.accessToken
                });

                RegisteredAlert();
            })
            .then(()=> {
                switch (this.state.roles[0]) {
                    case 'ROLE_OWNER':
                        if (!localStorage.getItem('token')) {
                            localStorage.setItem('token', this.state.token);
                        }
                        if (!localStorage.getItem('role')) {
                            localStorage.setItem('role', this.state.roles[0]);
                        }
                        if (!localStorage.getItem('user')) {
                            localStorage.setItem('user', this.state.tempUN);
                        }
                        return window.location.replace('/showSlotsOwner')
                    case 'ROLE_MANAGER':
                        if (!localStorage.getItem('token')) {
                            localStorage.setItem('token', this.state.token);
                        }
                        if (!localStorage.getItem('role')) {
                            localStorage.setItem('role', this.state.roles[0]);
                        }
                        if (!localStorage.getItem('user')) {
                            localStorage.setItem('user', this.state.tempUN);
                        }
                        return window.location.replace('/showSlotsManager')
                    default:
                    }
                    
            })
            .catch(error => {
                console.log(error.message);
                let message = "Login Failed"
                RegisterFail(message);
            });
    }
    render() {
        return (
            <div>
                <br/><br/>
                <Form className="register_wrapper" onSubmit={this.onSubmit}>
                    <h1>LOGIN</h1>
                   <div className="row justify-content-md-center">
                       <FormGroup className="col-6">
                           <Label for="examplNname">User Name</Label>
                           <Input
                               type="text"
                               name="username"
                               id="username"
                               value={this.state.username}
                               onChange={this.onChange}/>
                       </FormGroup>
                       </div>
                       <div className="row justify-content-md-center">
                    <FormGroup className="col-6">
                        <Label for="examplePassword">Password</Label>
                        <Input
                            type="password"
                            name="password" 
                            id="password"
                            value={this.state.password}
                            onChange={this.onChange}/>
                    </FormGroup>
                    </div>
                    <div className="row justify-content-md-center">
                    
                
                    </div>
                    &nbsp;
                    <button className="register_button btn btn-primary">LOGIN</button>
                    <FormGroup>
                        <Label>Login Page <a className="register"  href="/register">Register</a></Label>
                    </FormGroup>
                </Form>

            </div>
        );
    }
}

export default Login;