import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate, Link } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const [quote, setQuote] = useState('')
    const [tempQuote, setTempQuote] = useState('')
    const [name, setName] = useState('')

    async function populateQuote(){
        const req = await fetch('http://localhost:1337/api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await req.json()
        if(data.status === 'ok'){
            setQuote(data.quote)
        } else {
            alert(data.error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt.decode(token)
            if(!user){
                localStorage.removeItem('token')
                navigate.replace('/login')
            } else {
                populateQuote()
            }
        }
    }, [])

    async function updateQuote(event) {
        event.preventDefault()
        const req = await fetch('http://localhost:1337/api/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                quote: tempQuote,
            }),
        })

        const data = await req.json()
        if(data.status === 'ok'){
            setQuote(tempQuote)
            setTempQuote('')
        } else {
            alert(data.error)
        }
    }

    return (
        <div>
            <h1>Welcome to dashboard</h1>
            <li><a href='/login'>Logout</a></li>
            <li><a href='/addproduct'>Add Product</a></li>
            <li><a href='/updateuser'>Update User</a></li>
        </div>
        /*<div>
            <h1>Your quote: {quote || 'No quote found'}</h1>
            <form onSubmit={updateQuote}>
                <input 
                    type="text" 
                    placeholder="Quote" 
                    value={tempQuote} 
                    onChange={(e) => setTempQuote(e.target.value)}
                />
                <input 
                    type="submit"
                    value="Update quote"
                />
            </form>
        </div>*/
    )
}

export default Dashboard