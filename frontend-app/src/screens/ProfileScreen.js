import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }else {
            if(!user || !user.name || success) {
                dispatch({ type:USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            }
            else {
                setFirstName(user.first_name)
                setLastName(user.last_name)
                setEmail(user.email)
            }
        }
    }, [navigate, userInfo, user, dispatch, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        }else{
            dispatch(updateUserProfile({
                'id':user._id,
                'first_name': firstName,
                'last_name': lastName,
                'email': email,
                'password': password,
            }))
        }
    }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>

            <Form.Group controlId='firstName' className='py-3'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                required
                type='name'
                placeholder='first name (reset?)'
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
                placeholder='last name (reset?)'
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
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                >
            </Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='py-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control                
                type='password'
                placeholder='password (reset?)'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='passwordConfirm' className='py-3'>
                <Form.Label> Confirm Password</Form.Label>
                <Form.Control                
                type='password'
                placeholder='confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
        
            <Button type='submit' variant='primary'>
            Update
            </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
