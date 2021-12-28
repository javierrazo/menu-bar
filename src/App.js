import React from 'react'
// import logo from './logo.svg';
// import Beer from './components/Beer';
import MenuNavbar from './components/MenuNavbar';
import Food from './components/Food';
import Items from './components/Items';
import Item from './components/Item';
import Order from './components/Order';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaQrcode } from "react-icons/fa";

import QRCode from "react-qr-code";
// import QrReader from 'react-qr-reader'
import QrReader from 'react-qr-scanner'


import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      tipPercentage: 15,
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
    this.updateOder(menuTemp)
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
      console.log("Entro 0")

      try {
        orden = JSON.parse(orderScanned.text)
        orden.forEach(item => 
          { let exist = this.state.menu.findIndex((x) => x.id === item.id);
            menuTemp[exist].cantidad = item.cantidad;
          });
        this.setState({menu: menuTemp});
        this.setState({showScanner: !this.state.showScanner});
      } catch (error) {
        this.setState({result: 'Fallo'});
        return
      }
    }
    
  }

  handleError(err){
    let menuTemp = [...this.state.menu];
    menuTemp.forEach(item => {item.cantidad = 0});
    this.setState({menu: menuTemp});
    this.setState({result: 'Fallo'});
  }

  handleShowScanner() {
    this.setState({showScanner: !this.state.showScanner});
  }

  render() {    
    const cervezas = <Items items={this.state.menu.filter(item => item.id >= 100 && item.id < 200)} 
                      onAdd={this.increment} onRemove={this.decrement} onDelete={this.delete}/>
    const comidas = <Food items={this.state.menu.filter(item => item.id >= 200 && item.id < 300)}
                      onAdd={this.increment} onRemove={this.decrement} onDelete={this.delete}/>
    // const orden = <Items items={this.state.menu.filter(item => item.cantidad > 0 )}
    //                   onAdd={this.increment} onRemove={this.decrement} onDelete={this.delete}/>


    // const cervezas = 
    //   this.state.menu
    //     .filter(item => item.id >= 100 && item.id < 200 )
    //     .map(item => 
    //       <Col key={item.id+ce} xs={6} s={3} md={3} lg={2}><Beer key={item.id} item={item} onAdd={this.increment} onRemove={this.decrement} onDelete={this.delete} /></Col>
    //   );
    // const comidas = 
    //   this.state.menu
    //     .filter(item => item.id >= 200 && item.id < 300 )
    //     .map(item => 
    //       <Col key={item.id+'co'} xs={6} s={3} md={3} lg={2}><Beer key={item.id} item={item} onAdd={this.increment} onRemove={this.decrement} onDelete={this.delete} /></Col>
    //   );
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
            <Row className='justify-content-md-center'> {cervezas} </Row>

            <h1 id='comida'>COMIDA </h1>
            <Row className='justify-content-md-center'> {comidas} </Row>

            <h1 id='tuOrden'>TU ORDEN</h1>
            
            <Row className='justify-content-md-center'>
              { orden.length > 0  && 
                orden
              }
              { orden.length > 0  && 
                <Col xs={12} s={4} md={4}>
                  <Container className='orden'>
                    <Row>
                      <Col className='text-center'>
                        <QRCode value={this.state.order} bgColor={'#f8bf32'} level={'L'}/>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='ordenTitle'>Subtotal:</Col>
                      <Col>{subTotal}</Col>
                    </Row>
                    <Row>
                      <Col className='ordenTitle'>Propina:</Col>
                      <Col></Col>
                      {/* <Col>Propina {this.state.tipPercentage}%:</Col> */}
                      {/* <Col>{(subTotal*(this.state.tipPercentage / 100)).toFixed(2)}</Col> */}
                    </Row>
                    <Row>
                      <Col className='ordenTitle'><input type="radio" id="tip10" name="propina" value={15} onChange={this.onTipChanged} 
                            checked={this.state.tipPercentage == 15} /> 15% 
                      </Col>
                      <Col>{subTotal*.15}</Col>
                    </Row>
                    <Row>
                      <Col className='ordenTitle'><input type="radio" id="tip10" name="propina" value={10} onChange={this.onTipChanged} 
                            checked={this.state.tipPercentage == 10} /> 10% 
                      </Col>
                      <Col>{subTotal*.10}</Col>
                    </Row>
                    <Row>
                      <Col className='ordenTitle'><input type="radio" id="tip10" name="propina" value={5} onChange={this.onTipChanged} 
                            checked={this.state.tipPercentage == 5} /> 05% 
                      </Col>
                      <Col>{subTotal*.05}</Col>
                    </Row>
                    <Row>
                      <Col className='ordenTitle'>
                          <input type="radio" id="tipOther" name="propina" value={this.state.tipOther} onChange={this.onTipChanged} 
                            checked={this.state.tipPercentage == this.state.tipOther} /> 
                          <input type="number" id="tipOtherNumber" name="propina" min={0} value={this.state.tipOther} onChange={this.onOtherTipChanged}/>%
                      </Col>
                      <Col>{(subTotal*(this.state.tipOther/100)).toFixed(2)}</Col>
                    </Row>
                    <Row>
                      <Col className='ordenTitle'>Total: </Col>
                      <Col>{(subTotal + (subTotal*(this.state.tipPercentage / 100))).toFixed(2)}</Col>
                    </Row>
                  </Container>
                </Col>
              }
              { orden.length === 0  && 
                <Col className=''>
                
                <h3>Aun no has ordenado nada</h3>
                <h4>Explora el menu o escanea una Orden</h4>

                <Button className='order btn-secondary px-5 mt-3 mb-3 d-flex justify-content-center' onClick={ () => this.handleShowScanner()}>
                  <FaQrcode size={20}/>  ESCANEAR ORDEN
                </Button>

                <div>
                  
                  { this.state.showScanner && 
                    <QrReader style={{height: 240, width: 360}}
                    delay={100} onError={this.handleError} onScan={this.handleScan} /> }
                  {/* {this.state.result != '' && <p>{this.state.result}</p>} */}
                </div>
                </Col>
              } 

              
            </Row>
          </Container>
          <Footer />
      </div>
    );
  }
}

export default App;
