import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ListGroup, Button, Row, Col, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

function PlaceOrderScreen() {
   const cart = useSelector(state => state.cart)


  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4 />    
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>Address: {cart.shippingAddress.address + ', ' + cart.shippingAddress.city + ' ' + cart.shippingAddress.postalCode + ', ' + cart.shippingAddress.country + '.'}</p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment</h2>
                        <p>Option: {cart.paymentMethod}</p>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message variant='info'>Your cart is empty</Message> : (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row className='align-items-center'>
                                            <Col md={2}>
                                                <Link to={`/product/${item.product}`}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Link>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`} className='list-group-item-no-decoration'>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                    
                </ListGroup>
               
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items: </Col>
                                <Col md={4}>kjkjsd</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping: </Col>
                                <Col md={4}>kjkjsd</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax: </Col>
                                <Col md={4}>kjkjsd</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total: </Col>
                                <Col md={4}>kjkjsd</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button 
                                className='btn-block'
                                style={{width: "100%"}} type='button'
                                variant='primary'
                            >
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    Order
                                </div>
                            </Button>
                        </ListGroup.Item>
                        
                    </ListGroup>
                </Card>

            </Col>
        </Row>

    </div>
  )
}

export default PlaceOrderScreen
