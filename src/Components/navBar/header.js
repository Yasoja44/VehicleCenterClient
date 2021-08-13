import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import {
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarToggler,
    Collapse,
} from 'reactstrap';
import {Button} from "react-bootstrap";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            role: ''
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logoutOnClick = e => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        window.location.replace('/login')
    }
    

    componentDidMount() {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const user = localStorage.getItem('user');
        if (token) {
            this.setState({
                user: user,
                role: role
            });
        }
        this.setState({
            token: token
        })
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                
                <NavbarToggler/>
                <Collapse className="main" navbar>
                    <Nav className="me-auto">
                        { localStorage.getItem('role') !== "ROLE_OWNER" &&
                        localStorage.getItem('role') !== "ROLE_MANAGER" ?
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page"
                                       href="/">Home</a>
                                </li>
                            </ul>
                            :
                            null
                        }
                        {localStorage.getItem('role')=== "ROLE_MANAGER" ?
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page"
                                       href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/createSlots">Create Slots</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/showSlotsManager">Show Slots</a>
                                </li>
                            </ul>
                            :
                            null
                        }
                        {localStorage.getItem('role') === "ROLE_OWNER" ?
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page"
                                       href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/showSlotsOwner">Slots</a>
                                </li>
                            </ul>
                            :
                            null
                        }
                       
                    </Nav>
                    {localStorage.getItem('role') === "ROLE_OWNER" || localStorage.getItem('role') === "ROLE_MANAGER"  ?
                        <Nav className="ml-auto">
                        <UncontrolledDropdown nav>
                            <DropdownToggle nav caret style={{color: 'white'}}>
                                {this.state.user}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={this.logoutOnClick}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                        :
                        null
                    }
                    { localStorage.getItem('role') !== "ROLE_OWNER" &&
                    localStorage.getItem('role') !== "ROLE_MANAGER" ?
                        <Nav>
                            <a href="/login"><Button className="button"
                                                     variant="outline-primary">Login</Button></a>
                            &nbsp;
                            &nbsp;
                            <a href="/register"><Button className="button"
                                                        variant="outline-primary">Register</Button></a>
                         </Nav>
                        :
                        null
                    }
                </Collapse>
            </Navbar>
        );
    }
}
export default Header;