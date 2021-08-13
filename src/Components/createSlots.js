import React, {Component} from 'react';
import swat from "sweetalert2";
import axios from "axios";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import './createSlots.css'

const createdSlotAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Slot Created Successfully',
        showConfirmButton: false,
        timer: 3000
    });
}

const createdSlotFail = (res) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: res
    })
}

class createSlots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slotName: '',
            startingDate: '',
            startingTime: '',
            endingDate: '',
            endingTime: '',
            max: 0,
            bookModel: []
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        
        const token = localStorage.getItem('token');

        if (!token) {
            return window.location.replace('/login')
        }
        
        if(this.state.slotName | this.state.startingDate | this.state.startingTime | this.state.endingDate | this.state.endingTime === ''){
            createdSlotFail('All Fields Are Mandatory!!!');
        }else if(this.state.max <= 0){
            createdSlotFail('Invalid Max!!!');
        }else if(new Date(this.state.startingDate +"T"+this.state.startingTime+":00") <= new Date()){
            createdSlotFail('Invalid Starting Time!!!');
        }else if(new Date(this.state.endingDate +"T"+this.state.endingTime+":00") <= this.state.startingDate +"T"+this.state.startingTime+":00"){
            createdSlotFail('Invalid Ending Time!!!');
        }else{
            let slot = {
                slotName: this.state.slotName,
                startingTime: this.state.startingDate +"T"+this.state.startingTime+":00",
                endingTime: this.state.endingDate +"T"+this.state.endingTime+":00",
                max: this.state.max,
                bookModel: this.state.bookModel
            }
            console.log('DATA TO SEND', slot);
            //axios.post('http://localhost:8080/api/service/slots', slot)
            axios({
                method: 'post',
                url:'http://localhost:8080/api/service/slots',
                headers: {
                    Authorization: token
                },
                data: slot
            })
            .then(response => {
                    this.setState({
                        slotName: '',
                        startingDate: '',
                        startingTime: '',
                        endingDate: '',
                        endingTime: '',
                        max: 0,
                        bookModel: []
                    });
                    createdSlotAlert();
                })
            .catch(error => {
                    console.log(error.message);
                    let message = "Register Failed"
                    createdSlotFail(message);
            });
        }  
    }
    render() {
        return (
            <div>
                <br/><br/>
                <Form className="register_wrapper" onSubmit={this.onSubmit}>
                    <h1>CREATE SLOT</h1>
                    &nbsp;
                   <div className="row justify-content-md-center">
                       <FormGroup className="col-6">
                           <Label for="exampleEmail">Slot Name</Label>
                           <Input
                               type="text"
                               name="slotName"
                               id="slotName"
                               value={this.state.slotName}
                               onChange={this.onChange}/>
                       </FormGroup>
                   </div>
                   &nbsp;
                   <div className="row">
                       <FormGroup className="col-6">
                           <Label for="exampleEmail">Start</Label>
                           <Input
                               type="date"
                               name="startingDate"
                               id="exampleDate"
                               value={this.state.startingDate}
                               onChange={this.onChange}/>
                               &nbsp;
                            <Input
                               type="time"
                               name="startingTime"
                               id="exampleDate"
                               value={this.state.startingTime}
                               onChange={this.onChange}/>
                       </FormGroup>
                       
                       <FormGroup className="col-6">
                           <Label for="exampleSelect">End</Label>
                           <Input
                               type="date"
                               name="endingDate"
                               id="exampleDate"
                               value={this.state.endingDate}
                               onChange={this.onChange}/>
                               &nbsp;
                            <Input
                               type="time"
                               name="endingTime"
                               id="exampleDate"
                               value={this.state.endingTime}
                               onChange={this.onChange}/>
                       </FormGroup>
                   </div>
                   &nbsp;
                   <div className="row justify-content-md-center">
                   <FormGroup>
                        <Label for="exampleEmail">Max</Label>
                        <Input
                            type="number"
                            name="max"
                            id="exampleMax"
                            value={this.state.max}
                            onChange={this.onChange}/>
                        </FormGroup>
                    </div>
                    &nbsp;
                    <button className="register_button btn btn-primary">SUBMIT</button>
                </Form>

            </div>
        );
    }
}

export default createSlots;