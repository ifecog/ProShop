import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen() {
    
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  if(!shippingAddress.address) {
    navigate('/shipping')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('payment')
    navigate('/placeorder')
    dispatch(savePaymentMethod(paymentMethod))
  }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <Form onSubmit={submitHandler}>

            <Form.Group className='py-3'>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='paypal'
                        name='paymentMethod'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen