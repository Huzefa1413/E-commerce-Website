import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions.js'
import Product from '../components/Products'
import Message from '../components/Message.jsx'
import Loader from '../components/Loader.jsx'
import Paginate from '../components/Paginate.jsx'
import ProductCarousel from '../components/ProductCarousel.jsx'
import Meta from '../components/Meta.jsx'

const HomeScreen = () => {

    const { keyword } = useParams()
    const { pageNumber } = useParams() || 1
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            <Meta />
            {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Go Back</Link>}
            <h1>Latest Products</h1>
            {loading ? <Loader /> : error ? (<Message variant='danger'>{error}</Message>) :
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
            }

        </>
    )
}

export default HomeScreen;