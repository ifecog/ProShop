import axios from 'axios'
import { 
  CART_ADD_ITEM, 
  CART_REMOVE_ITEM,
  
  CART_SAVE_SHIPPING_ADDRESS,
  
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const addToCart = (id, qty) => (dispatch, getState) => {
  axios.get(`/api/products/${id}`)
    .then(response => {
      const { _id, name, image, price, count_in_stock } = response.data
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          product: _id,
          name,
          image,
          price,
          count_in_stock,
          qty
        }
      })
      localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    })
    .catch(error => console.log(error))
}

export const RemoveFromCart = (id, qty) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })
  localStorage.setItem('shippingAddress', JSON.stringify(data))

}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })
  localStorage.setItem('paymentMethod', JSON.stringify(data))

}

