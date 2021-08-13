import React, { Component} from 'react';
import axios from 'axios';


class ShowBookingsManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Slots: [],
            Bookings:[]
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');

        if (!token) {
            return window.location.replace('/login')
        }


        //axios.get(`http://localhost:8080/api/service/slots`)
        axios({
            method: 'get',
            url:`http://localhost:8080/api/service/slots`,
            headers: {
                Authorization: token
            },
            
        })
            .then(response => {
                this.setState({ Slots: response.data });
            }).then(() => {
                console.log(this.state.Slots);
                // eslint-disable-next-line array-callback-return
                this.state.Slots.map((item, index) => {
                console.log(item.id);
                if(item.id === this.props.match.params.id){
                    this.setState({ Bookings: item.book });
                };
            });
        })  
    }

      render() {
        return (
            <div>
                <div className="container p-3 my-3 bg-dark text-black-100">
                    <h1  className="text-white">Bookings</h1>
                    {this.state.Bookings.length > 0 && this.state.Bookings.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3" >
                                
                                <h4>Name: {item.name}</h4>
                                <h6>vehicle No: {item.vehicleNo}</h6>
                                &nbsp;
   
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        )
    }
}

export default ShowBookingsManager;