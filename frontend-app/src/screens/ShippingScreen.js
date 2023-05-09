import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingScreen() {

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [country, setCountry] = useState(shippingAddress.country)
  const [city, setCity] = useState(shippingAddress.city)
  const [address, setAddress] = useState(shippingAddress.address)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)


  const location = useLocation()

  const redirect = location.search ? location.search.split('=')[1] : '/' 


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ country, city, address, postalCode }))
    navigate('/payment')
  }



  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='country' className='py-3'>
            <Form.Label>Country</Form.Label>
            <Form.Control
                required
                type='text'
                placeholder='enter country'
                value={country ? country : ''}
                onChange={(e) => setCountry(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='city' className='py-3'>
            <Form.Label>City</Form.Label>
            <Form.Control
                required
                type='text'
                placeholder='enter city name'
                value={city ? city : ''}
                onChange={(e) => setCity(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='address' className='py-3'>
            <Form.Label>Address</Form.Label>
            <Form.Control
                required
                type='text'
                placeholder='enter address'
                value={address ? address : ''}
                onChange={(e) => setAddress(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode' className='py-3'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
                required
                type='text'
                placeholder='enter postal code'
                value={postalCode ? postalCode : ''}
                onChange={(e) => setPostalCode(e.target.value)}
            >
            </Form.Control>
        </Form.Group>
      
        <Button type='submit' variant='primary'>
            Continue
        </Button>

        <Row className='py-3'>
            <Col>
                Want to add more items before shipping? <Link
                to={redirect ? `/cart?redirect=${redirect}` : '/cart'} style={{ textDecoration: 'none' }}>
                    Cart
                </Link>
            </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
