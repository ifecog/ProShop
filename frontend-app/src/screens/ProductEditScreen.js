import React, { useState, useEffect } from "react"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import { listProductDetail, updateProduct } from "../actions/productActions"
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants"
// import { getUserDetails, updateUser } from "../actions/userActions"
// import { USER_UPDATE_RESET } from "../constants/userConstants"

function ProductEditScreen() {
  const { id } = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [brand, setBrand] = useState("")
  const [countInStock, setCountInStock] = useState(0)

  const productId = id

  const productDetails = useSelector((state) => state.productDetails)
  const { error, loading, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate("/admin/productlist")
    } else {
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetail(productId))
      } else {
        setName(product.name)
        setDescription(product.description)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.count_in_stock)
      }
    }
  }, [dispatch, productId, product, navigate, successUpdate])

  const submitHandler = (e) => {
    console.log("submit")
  }

  return (
    <div>
      <Link to='/admin/productlist'>Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='firstName' className='py-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='lastName' className='py-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='name'
                placeholder='enter last name'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='lastName' className='py-3'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='name'
                placeholder='enter last name'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='lastName' className='py-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='name'
                placeholder='enter last name'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='py-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin' className='py-3'>
              <Form.Label>Password</Form.Label>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  )
}

export default ProductEditScreen
