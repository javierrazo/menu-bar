import React, { Component } from 'react'
import Item from './Item';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';

export class Food extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    
    render() {
        const items = 
            this.props.items.map(item => 
                <Col key={item.id+'c'} xs={12} s={6} md={6} lg={3} >
                    <Item key={item.id} item={item} 
                        onAdd={this.props.onAdd} 
                        onRemove={this.props.onRemove} 
                        onDelete={this.props.onDelete}  
                    />
                </Col>
            );
        return (
            <>{items}</>
        )
    }
}

export default Food
