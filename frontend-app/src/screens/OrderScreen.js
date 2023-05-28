import React, { useState, useEffect } from "react"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"
import { ListGroup, Row, Col, Image, Card, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { PayPalButton } from "react-paypal-button-v2"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions"
import {
  ORDER_PAY_RESET,
  ORDER_DELIVERY_RESET,
} from "../constants/orderConstants"

function OrderScreen() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [sdkReady, setSdkReady] = useState(false)

  const orderId = id

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDelivery = useSelector((state) => state.orderDelivery)
  const { loading: loadingDelivery, success: successDelivery } = orderDelivery

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2)
  }

  const addPayPalScript = () => {
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AUxYt69t0y7JWpqB8er3OucnaRbo0_lqx4Q3U6xZ-rdg-VY6cgAwM-JLCf3wL4CLjNRZbRgs_a5mwZeD"
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/login")
    }
    if (
      !order ||
      successPay ||
      order._id !== Number(orderId) ||
      successDelivery
    ) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVERY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [
    navigate,
    userInfo,
    order,
    dispatch,
    orderId,
    successPay,
    successDelivery,
  ])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliveryHandler = () => {
    dispatch(deliverOrder(order))
  }

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
              <p>
                <strong>Name: {order.user.name}</strong>
              </p>
              <p>
                <strong>
                  <a
                    href={`mailto:${order.user.email}`}
                    className='list-group-item-no-decoration'
                  >
                    Email: {order.user.email}
                  </a>
                </strong>
              </p>
              <p>
                Shipping Address:{" "}
                {order.shippingAddress.address +
                  ", " +
                  order.shippingAddress.city +
                  " " +
                  order.shippingAddress.postalCode +
                  ", " +
                  order.shippingAddress.country +
                  "."}
              </p>

              {order.isDelivered ? (
                <Message variant='success'>
                  Delivery Date: {order.deliveryTime}
                </Message>
              ) : (
                <Message variant='warning'>Pending Delivery</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>
              <p>Option: {order.paymentMethod}</p>

              {order.isPaid ? (
                <Message variant='success'>
                  Payment Date: {order.paymentTime}
                </Message>
              ) : (
                <Message variant='warning'>Pending Payment</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant='info'>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className='align-items-center'>
                        <Col md={2}>
                          <Link to={`/product/${item.product}`}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Link>
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${item.product}`}
                            className='list-group-item-no-decoration'
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
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

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>

            {loadingDelivery && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn-block'
                    style={{ width: "100%" }}
                    onClick={deliveryHandler}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      Mark as Delivered
                    </div>
                  </Button>
                </ListGroup.Item>
              )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default OrderScreen
