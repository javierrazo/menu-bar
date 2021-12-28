import React from 'react'
// import Order from './Order';
import { BsPlusLg, BsDashLg, BsXLg } from 'react-icons/bs';
import { Button, Card } from 'react-bootstrap';

// BsPlusCircle
class Beer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    render() {
      return (
        <Card className="item">
          <Card.Img  className="itemImg" src={process.env.PUBLIC_URL+ 'images/' + this.props.item.imagen} alt="cerveza" />
          <Card.Body>

            <Card.Title className="nombre"><b>{this.props.item.nombre}</b></Card.Title>
            <Card.Text className="descripcion">{this.props.item.descripcion}</Card.Text>

            {this.props.item.maridaje && 
              <Card.Text className="maridaje">Maridaje: {this.props.item.maridaje}</Card.Text>
            }

            <Card.Text className="precio"><i>${this.props.item.precio} M.N</i></Card.Text>

            { this.props.item.cantidad > 0 && 
              // <Container>
                <div className="d-flex justify-content-between">
                  <Button className='manageOrder' size="sm" onClick={ () => this.props.onDelete(this.props.item)}>
                    <BsXLg size={15}/>
                  </Button>
                  <Button className='manageOrder' size="sm" onClick={ () => this.props.onRemove(this.props.item)}>
                    <BsDashLg size={15}/>
                  </Button>
                  <span>{this.props.item.cantidad}</span>
                  <Button className='manageOrder' size="sm" onClick={() => this.props.onAdd(this.props.item)}>
                    <BsPlusLg size={15}/>
                  </Button>
                </div>
              // </Container>
            }
            { this.props.item.cantidad === 0 && 
              // <Container>
              <div className="d-flex justify-content-between">
                <Button className='order flex-fill' size="sm" onClick={ () => this.props.onAdd(this.props.item)}>
                  AGREGAR
                </Button>
              </div>
              // </Container>

            }
            
          </Card.Body>
        </Card>
      );
    }
  };

export default Beer;