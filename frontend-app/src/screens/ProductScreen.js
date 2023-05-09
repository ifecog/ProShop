import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetail } from '../actions/productActions'

function ProductScreen() {
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()
  const productDetail = useSelector(state => state.productDetail)
  const { error, loading, product } = productDetail

  const { id } = useParams()

  useEffect(() => {
    dispatch(listProductDetail(id))

  }, [id, dispatch])

  const navigate = useNavigate()

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  return (
    <div>
      <Link to='/' className='btn btn-light' my-3>Go Back</Link>
      {loading ? <Loader />
        : error ? <Message>{error}</Message>
          :
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item className='list-group-item-no-decoration'>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  Price: ${product.price}
                </ListGroup.Item>
            
                <ListGroup.Item>
                  Quantity: {product.count_in_stock}
                </ListGroup.Item>
            
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.num_reviews} reviews`} color={'#f8e825'} />
                </ListGroup.Item>

              </ListGroup>
            </Col>
        
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>                
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>{product.count_in_stock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                      </Col>
                    </Row>                
                  </ListGroup.Item>

                  {product.count_in_stock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs='auto' className='my-1'>
                          <Form.Control
                            className='form-select form-select-override'
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {
                              [...Array(product.count_in_stock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))
                            }
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler} className='btn-block'
                      disabled={product.count_in_stock === 0} type='button'
                      style={{width: "100%"}}
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        Add to Cart
                      </div>
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
      }
    </div>
  )
}

export default ProductScreen

  // const { id } = useParams()
  // const product = products.find((p) => String(p._id) === id)
  // if(!product) {
  //   return (
  //     <div>
  //       Product not found!
  //     </div>
  //   )
  // }

    // const [ product, setProduct ] = useState([])
  // const { id } = useParams()

  // useEffect(() => {
  //   async function fetchProduct(){
  //     const { data } = await axios.get(`/api/products/${id}`)
  //     setProduct(data)
  //   }

  //   fetchProduct()  
    
  // }, [id])
