import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        }
        else {
            navigate('/')
        }
    }
    return (
        <Form onSubmit={submitHandler} style={{ display: "flex" }}>
            <Form.Control type="text" name="q" onChange={(e) => { setKeyword(e.target.value) }} className="mr-sm-2 ml-sm-5" placeholder='Search Products....' ></Form.Control>
            <Button type='submit' variant='success' className='p-2'>Search</Button>
        </Form >
    )
}

export default SearchBox