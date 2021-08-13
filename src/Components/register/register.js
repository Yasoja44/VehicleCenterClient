import React, {Component} from 'react';
import swat from "sweetalert2";
import axios from "axios";
import {Form, FormGroup, Label, Input } from 'reactstrap';
// import {SERVER_ADDRESS} from "../../../Constants/Constants";
import './register.css'

const RegisteredAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Registered Successfully ',
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

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            roles:[]
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


        if(this.state.username | this.state.password  === ''){
            RegisterFail('All Fields Are Mandatory!!!');
        }else if(this.state.roles.length === 0){
            RegisterFail('Role Is Mandatory!!!');
        }else if(this.state.username.length <= 5 || this.state.password.length <= 5){
            RegisterFail('Username or Password too small!!!');
        }else{
            let user = {
                username: this.state.username,
                password: this.state.password,
                roles: this.state.roles
            }
            console.log('DATA TO SEND', user);
            axios.post('http://localhost:8080/api/service/signUp', user)
                .then(response => {
                    this.setState({
                        username: '',
                        roles: '',
                        password: '',
                    });
                    RegisteredAlert();
                })
                .catch(error => {
                    console.log(error.message);
                    let message = "Register Failed"
                    RegisterFail(message);
                });
        }

        
    }
    render() {
        return (
            <div>
                <br/><br/>
                <Form className="register_wrapper" onSubmit={this.onSubmit}>
                    <h1>REGISTER</h1>
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
                    <FormGroup >
                        <Label for="exampleRole">Role</Label>
                        <div className="radio">
                            <label>
                                <input
                                type="radio"
                                value="manager"
                            
                                onChange={this.onValueChange}
                                />
                                Manager
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input
                                type="radio"
                                value="owner"
                            
                                onChange={this.onValueChange}
                                />
                                Owner
                            </label>
                            </div>
                    </FormGroup>
                
                    </div>
                    &nbsp;
                    <button className="register_button btn btn-primary">REGISTER</button>
                    <FormGroup>
                        <Label>Login Page <a className="register"  href="/login">Login</a></Label>
                    </FormGroup>
                </Form>

            </div>
        );
    }
}

export default Register;