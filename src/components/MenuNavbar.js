import React, { Component } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap';
import { BsHouseDoorFill, BsListUl } from 'react-icons/bs';
import { FaBeer, FaHamburger } from "react-icons/fa";


export class MenuNavbar extends Component {
    render() {
        return (
            <Navbar fixed="top" bg="light" expand="lg" className='navbar-dark bg-dark' collapseOnSelect={true}>
                <Container>
                    <Navbar.Brand href="#home">Menu Bar</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link href="#cervezas"> <BsHouseDoorFill size={15}/> Inicio</Nav.Link>
                        <Nav.Link href="#cervezas"> <FaBeer size={15}/> Cervezas</Nav.Link>
                        <Nav.Link href="#comida"> <FaHamburger size={15}/> Comida</Nav.Link>
                        <Nav.Link href="#tuOrden"> <BsListUl size={15}/> Tu orden</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default MenuNavbar
