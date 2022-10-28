import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Cart } from 'react-bootstrap'
import Message from '../Message.jsx'
import { addToCart } from '../../actions/cartActions.js'

const CartScreen = ({ location }) => {
    const { id } = useParams();

    const productId = id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    return (
        <div>CartScreen</div>
    )
}

export default CartScreen