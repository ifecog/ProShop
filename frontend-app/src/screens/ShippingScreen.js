import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'

function ShippingScreen() {
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('Submitted')
  }



  return (
    <FormContainer>
      Shipping
    </FormContainer>
  )
}

export default ShippingScreen
