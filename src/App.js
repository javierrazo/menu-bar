import React from 'react'
import MenuNavbar from './components/MenuNavbar';
import Food from './components/Food';
import Items from './components/Items';
import Order from './components/Order';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaQrcode } from "react-icons/fa";

import QRCode from "react-qr-code";
import QrReader from 'react-qr-reader'


import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      tipPercentage: 15.0,
      tipOther: 0,
      result: '',
      order: '',
      showScanner: false,
    }
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.delete = this.delete.bind(this)
    this.onTipChanged = this.onTipChanged.bind(this)
    this.onOtherTipChanged = this.onOtherTipChanged.bind(this)
    this.handleScan = this.handleScan.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleShowScanner = this.handleShowScanner.bind(this)
    this.updateOder = this.updateOder.bind(this)
  }

  componentDidMount() {
    fetch('./menu.json')
      .then(response => response.json())
      .then(result => {
        const menu = result.map(item => {
          return item;
        });
        this.setState({
          menu: menu
        })
      })
      
    // fetch('./comida.json')
    //   .then(response => response.json())
    //   .then(result => {
    //     const comidas = result.map(item => {
    //       return item;
    //     });
    //     this.setState({
    //       comidas: comidas
    //     })
    //   })
  }

  increment (item) {
    const exist = this.state.menu.find((x) => x.id === item.id);
    let menuTemp =
      this.state.menu.map((x) =>
        x.id === item.id ? { ...exist, cantidad: exist.cantidad + 1 } : x
      );
    this.setState({menu: menuTemp});
    this.updateOder(menuTemp);
  }

  decrement (item) {
    const exist = this.state.menu.find((x) => x.id === item.id);
    let menuTemp =
      this.state.menu.map((x) =>
        x.id === item.id ? { ...exist, cantidad: exist.cantidad - 1 } : x
      );
    this.setState({menu: menuTemp});
    this.updateOder(menuTemp)
  }

  delete (item) {
    const exist = this.state.menu.find((x) => x.id === item.id);
    let menuTemp =
      this.state.menu.map((x) =>
        x.id === item.id ? { ...exist, cantidad: 0 } : x
      );
    this.setState({menu: menuTemp});
    this.updateOder(menuTemp)
  }

  onTipChanged ( e ) {
    this.setState({
      tipPercentage: e.currentTarget.value,
    })
  }

  onOtherTipChanged ( e ) {
    this.setState({
      tipOther: e.currentTarget.value,
      tipPercentage: e.currentTarget.value,
    })
  }

  updateOder (menuTemp) {
    let orden = menuTemp.filter(item => item.cantidad > 0 )
    let listToKeep = ['id', 'cantidad'];

    let newArray = orden.map(obj => listToKeep.reduce((newObj, key) => {
      newObj[key] = obj[key]
      return newObj
    }, {}))

    this.setState({order: JSON.stringify(newArray)})
  }

  handleScan(orderScanned){
    if ( orderScanned != null ) {
      let orden = []
      let menuTemp = [...this.state.menu];
      menuTemp.forEach(item => {item.cantidad = 0});

      try {
        orden = JSON.parse(orderScanned)
        orden.forEach(item => 
          { let exist = this.state.menu.findIndex((x) => x.id === item.id);
            menuTemp[exist].cantidad = item.cantidad;
          });
        this.setState({menu: menuTemp});
        this.setState({showScanner: !this.state.showScanner});
        this.updateOder(menuTemp)
      } catch (error) {
        return
      }
    }
    
  }

  handleError(err){
    if ( err != null ) {
      let menuTemp = [...this.state.menu];
      menuTemp.forEach(item => {item.cantidad = 0});
      this.setState({menu: menuTemp});
      this.setState({result: 'Fallo'});
    }
  }

  handleShowScanner() {
    this.setState({showScanner: !this.state.showScanner});
  }

  render() {    
    const cervezas = <Items items={this.state.menu.filter(item => item.id >= 100 && item.id < 200)} 
                      onAdd={this.increment} onRemove={this.decrement} onDelete={this.delete}/>
    const comidas = <Food items={this.state.menu.filter(item => item.id >= 200 && item.id < 300)}
                      onAdd={this.increment} onRemove={this.decrement} onDelete={this.delete}/>
    const orden = this.state.menu.filter(item => item.cantidad > 0 ).map(item => 
        <Col key={item.id+'or'} xs={6} s={3} md={3} lg={2}>
          <Order key={item.id} item={item} onAdd={this.increment} onRemove={this.decrement} onDelete={this.delete}/>
        </Col>
      );

    const subTotal = this.state.menu.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    return (
      <div className="App">
          <MenuNavbar/>

          <Container>
            <h1 id='cervezas'>CERVEZAS</h1>
            <Row className='justify-content-xs-center'> {cervezas} </Row>

            <h1 id='comida'>COMIDA </h1>
            <Row className='justify-content-xs-center'> {comidas} </Row>

            <h1 id='tuOrden'>TU ORDEN</h1>
            
              { orden.length > 0  && 
                <Row className='justify-content-xs-center'>
                  {orden}
                </Row>
              }
              { orden.length > 0  && 
                <Row className='justify-content-xs-center'>
                  <Col xs={12} md={'auto'} lg={'auto'}>
                    <Container className='orden'>
                      <Row className='justify-content-center pt-3 '>
                        <Col className='text-center p-3 bg-light  shadow' xs={'auto'} s={'auto'} md={'auto'} lg={'auto'}>
                          <QRCode value={this.state.order} />
                        </Col>
                      </Row>
                      <Row className='mt-3'>
                        <Col className='ordenTitle'><h5>Subtotal:</h5></Col>
                        <Col><h5>${subTotal}</h5></Col>
                      </Row>
                      <Row>
                        <Col className='ordenTitle'><h5>Propina:</h5></Col>
                        <Col></Col>
                      </Row>
                      <Row>
                        <Col className='ordenTitle'><h6>
                              <input type="radio" id="tip10" name="propina" value={15.0} onChange={this.onTipChanged} 
                              checked={this.state.tipPercentage == 15.0} /> 
                              15%</h6>
                        </Col>
                        <Col><h6>${(subTotal*.15).toFixed(2)}</h6></Col>
                      </Row>
                      <Row>
                        <Col className='ordenTitle'>
                          <h6>
                            <input type="radio" id="tip10" name="propina" value={10} onChange={this.onTipChanged} 
                            checked={this.state.tipPercentage == 10} />
                            10%
                          </h6> 
                        </Col>
                        <Col><h6>${(subTotal*.10).toFixed(2)}</h6></Col>
                      </Row>
                      <Row>
                        <Col className='ordenTitle'>
                          <h6>
                            <input type="radio" id="tip10" name="propina" value={5} onChange={this.onTipChanged} 
                              checked={this.state.tipPercentage == 5} /> 
                            05%
                          </h6>
                        </Col>
                        <Col><h6>${(subTotal*.05).toFixed(2)}</h6></Col>
                      </Row>
                      <Row>
                        <Col className='ordenTitle'>
                          <h6>
                            <input type="radio" id="tipOther" name="propina" value={this.state.tipOther} onChange={this.onTipChanged} 
                              checked={this.state.tipPercentage == this.state.tipOther} /> 
                            <input type="number" id="tipOtherNumber" name="propina" min={0} value={this.state.tipOther} onChange={this.onOtherTipChanged}/>%
                          </h6>
                        </Col>
                        <Col><h6>${(subTotal*(this.state.tipOther/100)).toFixed(2)}</h6></Col>
                      </Row>
                      <Row className='mt-2 font-weight-bold text-uppercase'>
                        <Col className='ordenTitle'><h4>Total:</h4></Col>
                        <Col><h4>${(subTotal + (subTotal*(this.state.tipPercentage / 100))).toFixed(2)}</h4></Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              }
              { orden.length === 0  && 
                <Row className='justify-content-xs-center'>
                  <Col className='' xs={12} s={12} md={'auto'} lg={'auto'}>
                    <h3>Aun no has ordenado nada</h3>
                    <h4>Explora el menu o escanea una Orden</h4>

                    <div className="d-grid">
                      <Button className='order btn-secondary mt-3 mb-3 px-4'  onClick={ () => this.handleShowScanner()}>
                        <FaQrcode size={20} className='mx-2'/>  
                        <span className='mx-2'>ESCANEAR ORDEN</span>
                      </Button>
                    </div>

                    <div>
                      { this.state.showScanner && 
                        <QrReader className='qrreader shadow' showViewFinder={false}
                        delay={100} onError={this.handleError} onScan={this.handleScan} /> }
                    </div>
                  </Col>
                </Row>
              } 
              
          </Container>
          <Footer />
      </div>
    );
  }
}

export default App;
