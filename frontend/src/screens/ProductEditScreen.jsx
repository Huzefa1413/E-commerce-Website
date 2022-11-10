import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails } from '../actions/productActions'

const ProductEditScreen = ({ location }) => {
    const { id } = useParams();
    const productId = id;

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState("")

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    // const userUpdate = useSelector(state => state.userUpdate);
    // const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    const navigate = useNavigate()
    useEffect(() => {
        if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId))
        }
        else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    }, [product, productId, dispatch, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {/* {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{error}</Message>} */}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name' className='pb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => { setName(e.target.value) }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price' className='pb-3'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e) => { setPrice(e.target.value) }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image' className='pb-3'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) => { setImage(e.target.value) }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brand' className='pb-3'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Brand'
                                value={brand}
                                onChange={(e) => { setBrand(e.target.value) }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock' className='pb-3'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Count In Stock'
                                value={countInStock}
                                onChange={(e) => { setCountInStock(e.target.value) }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category' className='pb-3'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Category'
                                value={category}
                                onChange={(e) => { setCategory(e.target.value) }}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description' className='pb-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}></Form.Control>
                        </Form.Group>

                        <Button type="submit" variant='primary'>Update</Button>

                    </Form>
                )}
            </FormContainer >
        </>

    )
}

export default ProductEditScreen