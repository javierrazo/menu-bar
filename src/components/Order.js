import React from 'react'
// import Order from './Order';
import { BsPlusLg, BsDashLg, BsXLg } from 'react-icons/bs';
import { Button, Card } from 'react-bootstrap';

// BsPlusCircle
class Order extends React.Component {
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
            <Card.Text className="precio"><i>${this.props.item.precio} M.N</i></Card.Text>

            <div className="d-flex justify-content-center">
              <Button className='manageOrder btn-secondary' size="sm" onClick={ () => this.props.onDelete(this.props.item)}>
                <BsXLg size={10}/>
              </Button>
              <Button className='manageOrder btn-secondary' size="sm" onClick={ () => this.props.onRemove(this.props.item)}>
                <BsDashLg size={10}/>
              </Button>
              <span className='mx-3'>{this.props.item.cantidad}</span>
              <Button className='manageOrder btn-secondary' size="sm" onClick={() => this.props.onAdd(this.props.item)}>
                <BsPlusLg size={10}/>
              </Button>
            </div>
            
          </Card.Body>
        </Card>
      );
    }
  };

export default Order;