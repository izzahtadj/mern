import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

function App() {

  const navigate = useNavigate()
  const [productname, setProductname] = useState('')
  const [productcat, setProductcat] = useState('')
  const [productsubcat, setProductsubcat] = useState('')
  const [productprice, setProductprice] = useState('')
  const [productqty, setProductqty] = useState('')
  const [productdesc, setProductdesc] = useState('')

  async function addProduct(event){
    event.preventDefault()
    const response = await fetch('http://localhost:1337/api/addproduct', {
    method: 'POST',  
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productname,
        productcat,
        productsubcat,
        productprice,
        productqty,
        productdesc,
      }),
    })

    const data = await response.json()

    if(data.status === 'ok'){
      navigate('/dashboard')
    }
  }

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={addProduct}>
        <input
          value={productname}
          onChange={(e) => setProductname(e.target.value)}
          type="text"
          placeholder="Product Name"
        /><br/>
        <input
          value={productcat}
          onChange={(e) => setProductcat(e.target.value)}
          type="text"
          placeholder="Product Category"
        /><br/>
        <input
          value={productsubcat}
          onChange={(e) => setProductsubcat(e.target.value)}
          type="text"
          placeholder="Product Sub Category"
        /><br/>
        <input
          value={productprice}
          onChange={(e) => setProductprice(e.target.value)}
          type="number"
          placeholder="Product Price"
        /><br/>
        <input
          value={productqty}
          onChange={(e) => setProductqty(e.target.value)}
          type="number"
          placeholder="Product Quantity"
        /><br/>
        <input
          value={productdesc}
          onChange={(e) => setProductdesc(e.target.value)}
          type="text"
          placeholder="Product Description"
        /><br/>
        <input type="submit" value="Add Product" />
        <Link to={'/dashboard'}>
        <button>Dashboard</button>
        </Link>
      </form>
    </div>
  )
}

export default App;
