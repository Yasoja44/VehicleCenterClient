import React, { Component} from 'react';
import axios from 'axios';
import moment from 'moment'


class ShowSlotsOwner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Slots: [],
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');

        if (!token) {
            return window.location.replace('/login')
        }
        
        //axios.get('http://localhost:8080/api/service/slots')
        axios({
            method: 'get',
            url:`http://localhost:8080/api/service/slots`,
            headers: {
                Authorization: token
            },
            
        })
        .then(response => {
            this.setState({ Slots: response.data });
        })
    }

    navigateVehiclePage(e, vehiId) {
        window.location = `createBooking/${vehiId}`
    }



      render() {
        return (
            <div>
                <div className="container p-3 my-3 bg-dark text-black-100">
                    <h1  className="text-white">Slots</h1>
                    {this.state.Slots.length > 0 && this.state.Slots.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3" onClick={e => this.navigateVehiclePage(e, item.id)}>
                                
                                <h4>Name: {item.slotName}</h4>

                                <h6>Start: {moment(item.startingTime).format('DD-MM-YYYY hh:mm A')}</h6>
                                <h6>End: {moment(item.endingTime).format('DD-MM-YYYY hh:mm A')}</h6>
                                <h6>Max: {item.max}</h6>
                                <h6>Available: {item.available}</h6>
                    
                            
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default ShowSlotsOwner;