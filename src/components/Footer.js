import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { BsFacebook, BsInstagram, BsTwitter, BsHouseDoorFill, BsListUl, BsEnvelopeFill, BsFillTelephoneFill} from 'react-icons/bs';
import { FaBeer, FaHamburger, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";



export default class Footer extends Component {
    render() {
        return (
            <footer className="bg-dark text-white">
                <Container className='mt-4 pt-4 pb-4'>
                    <Row>
                        <Col xs={12} s={12} md={5} lg={5}>
                            <h5>Menu Bar</h5>
                            <p>Esto, es 686 Cervecería, el gusto por el sabor de una buena cerveza; momentos, amistades, la bohemia; 
                               un instante en el que eres tú y un mundo de sensaciones únicas en cada trago.</p>
                            <p>Combinamos todo ésto en nuestras recetas con el corazón, pensando en los paladares que gustan de los 
                               pequeños detalles.</p>
                            <p>¡Salud!</p>
                        </Col>
                        
                        <Col className='footer' xs={2} s={2} md={2} lg={1}>
                            <h5>Redes</h5>
                            <ul>
                            <li><a href="https://goo.gl/maps/wB1fxDQ7TnwaBEaF8" className="btn btn-outline-light m-1"><BsFacebook size={15}/></a></li>
                            <li><a href="mailto:menu.bar@gmail.com" className="btn btn-outline-light m-1"><BsInstagram size={15}/></a></li>
                            <li><a href="tel:+526861276682" className="btn btn-outline-light m-1"><BsTwitter size={15}/></a></li>
                            </ul>
                        </Col>

                        <Col className='footer' xs={6} s={2} md={3} lg={4}>
                            <h5>Contacto</h5>
                            <ul>
                            <li><a className='link-light' href="https://goo.gl/maps/wB1fxDQ7TnwaBEaF8" ><FaMapMarkerAlt size={15}/> Avenida Gral. Ignacio Zaragoza 1253, Segunda, 21100 Mexicali, B.C.</a></li>
                            <li><a className='link-light' href="mailto:menu.bar@gmail.com"><BsEnvelopeFill size={15}/> menu.bar@gmail.com</a></li>
                            <li><a className='link-light' href="tel:+526861276682"><FaWhatsapp size={15}/> (686) 123-4567</a></li>
                            <li><a className='link-light' href="tel:+526861276682"><BsFillTelephoneFill size={15}/> (686) 123-4567</a></li>
                            </ul>
                        </Col>
                        
                        <Col className='footer' xs={4} s={3} md={2} lg={2}>
                            <h5>Secciones</h5>
                            <ul>
                            <li><a className='link-light' href="#cervezas"><BsHouseDoorFill size={15}/> Inicio</a></li>
                            <li><a className='link-light' href="#cervezas"><FaBeer size={15}/> Cervezas</a></li>
                            <li><a className='link-light' href="#comida"><FaHamburger size={15}/> Comida</a></li>
                            <li><a className='link-light' href="#tuOrden"><BsListUl size={15}/> Tu orden</a></li>
                            </ul>
                        </Col>
                    </Row>
                </Container>

                <div className="text-center pt-2 pb-2 bg-secondary" >
                    <span>© 2020 Copyright: </span>
                    <a className="text-white" href="#!">Menu Bar</a>
                </div>
            </footer>
        
        )
    }
}