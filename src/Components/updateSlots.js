import React, { Component} from 'react';
import axios from 'axios';
import swat from "sweetalert2";
import { Form, FormGroup, Label, Input } from 'reactstrap';

const SubmissionAlert = () => {
    swat.fire({
        position: 'center',
        icon: 'success',
        title: 'Slot Updated Successfully!',
        showConfirmButton: false,
        timer: 3000
    });
}

const SubmissionFail = (res) => {
    swat.fire({
        icon: 'error',
        title: 'Oops...',
        text: res
    })
}

const initialState = {
            slot:[],
            slotName: '',
            startingDate: '',
            startingTime: '',
            endingDate: '',
            endingTime: '',
            max: 0,
            bookModel:[]
}

class UpdateSlot extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = initialState;
    }

    componentDidMount() {

        const token = localStorage.getItem('token');

        if (!token) {
            return window.location.replace('/login')
        }



        axios({
            method: 'get',
            url:`http://localhost:8080/api/service/slots`,
            headers: {
                Authorization: token
            },
            
        }).then(response => {
                this.setState({ slot: response.data });
        }).then(() => {
            // eslint-disable-next-line array-callback-return
            this.state.slot.map((item, index) => {
                console.log(item.id);
                if(item.id === this.props.location.update.bookId){
                    this.setState({ 
                        slotName: item.slotName,
                        startingDate:item.startingTime.substr(0,10),
                        startingTime:item.startingTime.substr(11,15),
                        endingDate: item.endingTime.substr(0,10),
                        endingTime:item.endingTime.substr(11,15),
                        max: item.max

                    });
                };
            });
        })

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    onSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (!token) {
            return window.location.replace('/login')
        }

        if(this.state.slotName | this.state.startingDate | this.state.startingTime | this.state.endingDate | this.state.endingTime === ''){
            SubmissionFail('All Fields Are Mandatory!!!');
        }else if(this.state.max <= 0){
            SubmissionFail('Invalid Max!!!');
        }else if(new Date(this.state.startingDate +"T"+this.state.startingTime+":00") <= new Date()){
            SubmissionFail('Invalid Starting Time!!!');
        }else if(new Date(this.state.endingDate +"T"+this.state.endingTime+":00") <= this.state.startingDate +"T"+this.state.startingTime+":00"){
            SubmissionFail('Invalid Ending Time!!!');
        }else{
            let slot = {
                slotName: this.state.slotName,
                startingTime: this.state.startingDate +"T"+this.state.startingTime+":00",
                endingTime: this.state.endingDate +"T"+this.state.endingTime+":00",
                max: this.state.max,
                // bookModel: this.state.bookModel
            };
            console.log('DATA TO SEND', slot)
            //axios.put(`http://localhost:8080/api/service/slots/${this.props.location.update.bookId}`, slot)
            axios({
                method: 'put',
                url:`http://localhost:8080/api/service/slots/${this.props.location.update.bookId}`,
                headers: {
                    Authorization: token
                },
                data: slot
                
            })
            .then(response => {
                    SubmissionAlert();
                })
            .catch(error => {
                    console.log(error.message);
                    SubmissionFail("Failed!!!");
            })
        }

        
    }

    render() {
        return (
            <div>
                <br/><br/>
                <Form className="register_wrapper" onSubmit={this.onSubmit}>
                    <h1>UPDATE SLOT</h1>
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
                               id="endingDate"
                               value={this.state.endingDate}
                               onChange={this.onChange}/>
                               &nbsp;
                            <Input
                               type="time"
                               name="endingTime"
                               id="endingTime"
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

export default UpdateSlot;