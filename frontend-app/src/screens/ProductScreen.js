import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetail } from '../actions/productActions'

function ProductScreen() {
  const dispatch = useDispatch()
  const productDetail = useSelector(state => state.productDetail)
  const { error, loading, product } = productDetail

  const { id } = useParams()

  useEffect(() => {
    dispatch(listProductDetail(id))

  }, [id, dispatch])

  // const [ product, setProduct ] = useState([])
  // const { id } = useParams()

  // useEffect(() => {
  //   async function fetchProduct(){
  //     const { data } = await axios.get(`/api/products/${id}`)
  //     setProduct(data)
  //   }

  //   fetchProduct()  
    
  // }, [id])

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
                <ListGroup.Item>
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

                  <ListGroup.Item className='text-center'>
                    <Button className='btn-block' disabled={product.countInStock === 0} type='button'>Add to Cart</Button>
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
