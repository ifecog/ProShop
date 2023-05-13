import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { ListGroup, Row, Col, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'

function OrderScreen() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const orderId = id

    const orderDetails= useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

  
    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    const addPayPalScripts = () => {
        const script = document.createElement('script')
    }

    useEffect(() => {
        if(!order || order._id !== Number(orderId)) {
            dispatch(getOrderDetails(orderId))
        }
   }, [ order, dispatch, orderId ])



  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div>
        <h1>No of Items: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Delivery Details</h2>
                        <p><strong>Name: {order.user.name}</strong></p>
                        <p><strong><a href={`mailto:${order.user.email}`} className='list-group-item-no-decoration'>Email: {order.user.email}</a></strong></p>
                        <p>Shipping Address: {order.shippingAddress.address + ', ' + order.shippingAddress.city + ' ' + order.shippingAddress.postalCode + ', ' + order.shippingAddress.country + '.'}</p>

                        {order.isDelivered ? (
                            <Message variant='success'>Delivery Date: {order.deliveryTime}</Message>
                        ) : (
                            <Message variant='warning'>Pending Delivery</Message>
                        
                        )}

                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment</h2>
                        <p>Option: {order.paymentMethod}</p>

                        {order.isPaid ? (
                            <Message variant='success'>Payment Date: {order.paymentTime}</Message>
                        ) : (
                            <Message variant='warning'>Pending Payment</Message>
                        )}
                        
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message variant='info'>Order is empty</Message> : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
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
                                <Col md={4}>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping: </Col>
                                <Col md={4}>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax: </Col>
                                <Col md={4}>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total: </Col>
                                <Col md={4}>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        
                    </ListGroup>
                </Card>
            </Col>
        </Row>

    </div>
  )
}

export default OrderScreen
