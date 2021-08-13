import React, {Component} from 'react';
import swat from "sweetalert2";
import axios from "axios";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import './createSlots.css'

const createdSlotAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Booking Created Successfully ',
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

class createBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            vehicleNo: ''
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

        if(this.state.name | this.state.vehicleNo === ''){
            createdSlotFail('All Fields Are Mandatory!!!');
        }else{
            let booking = {
                name: this.state.name,
                vehicleNo: this.state.vehicleNo
            }
            console.log('DATA TO SEND', booking);
            //axios.post(`http://localhost:8080/api/service/slots/put/${this.props.match.params.id}`, booking)
            axios({
                method: 'post',
                url:`http://localhost:8080/api/service/slots/put/${this.props.match.params.id}`,
                headers: {
                    Authorization: token
                },
                data: booking
            })
            .then(response => {
                    this.setState({
                        name: '',
                        vehicleNo: ''
                    });
                    createdSlotAlert();
            })
            .catch(error => {
                    console.log(error.message);
                    let message = "Booking Failed"
                    createdSlotFail(message);
            });
        }

        
    }
    render() {
        return (
            <div>
                <br/><br/>
                <Form className="register_wrapper" onSubmit={this.onSubmit}>
                    <h1>CREATE BOOKING</h1>
                    &nbsp;
                   <div className="row justify-content-md-center">
                       <FormGroup className="col-6">
                           <Label for="exampleEmail">Name</Label>
                           <Input
                               type="text"
                               name="name"
                               id="name"
                               value={this.state.name}
                               onChange={this.onChange}/>
                       </FormGroup>
                   </div>
                   &nbsp;
                   <div className="row justify-content-md-center">
                       <FormGroup className="col-6">
                           <Label for="exampleEmail">Vehicle No</Label>
                           <Input
                               type="text"
                               name="vehicleNo"
                               id="vehicleNo"
                               value={this.state.vehicleNo}
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

export default createBooking;