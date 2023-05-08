import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'

function ShippingScreen() {
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('Submitted')
  }



  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='firstName' className='py-3'>
            <Form.Label>Country</Form.Label>
            <Form.Control
                required
                type='name'
                placeholder='enter first name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='lastName' className='py-3'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
                required
                type='name'
                placeholder='enter last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='email' className='py-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control
                required
                type='email'
                placeholder='enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='py-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
                required
                type='password'
                placeholder='enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='passwordConfirm' className='py-3'>
            <Form.Label> Confirm Password</Form.Label>
            <Form.Control
                required
                type='password'
                placeholder='confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            >
            </Form.Control>
        </Form.Group>
        
        <Button type='submit' variant='primary'>
            Sign Up
        </Button>

        <Row className='py-3'>
            <Col>
                Have an account? <Link
                to={redirect ? `/login?redirect=${redirect}` : '/login'} style={{ textDecoration: 'none' }}>
                    Login
                </Link>
            </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
