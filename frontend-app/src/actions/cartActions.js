import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'

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
