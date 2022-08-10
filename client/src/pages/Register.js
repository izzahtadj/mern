import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

function App() {

  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [userstatus, setUserstatus] = useState('')

  async function registerUser(event){
    event.preventDefault()
    const response = await fetch('http://localhost:1337/api/register', {
    method: 'POST',  
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
        userstatus,
      }),
    })

    const data = await response.json()

    if(data.status === 'ok'){
      navigate('/login')
    }
  }
  
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        /><br/>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        /><br/>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        /><br/>
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          type="text"
          placeholder="Role"
        /><br/>
        <p>User Status:</p>
		    <input
          value="Active"
          onChange={(e) => setUserstatus(e.target.value)}
          type="radio"
          id="active"
          name="userstatus"
        />
        <label for="active">Active</label><br/>
        <input
          value="Disabled"
          onChange={(e) => setUserstatus(e.target.value)}
          type="radio"
          id="disabled"
          name="userstatus"
        />
        <label for="disabled">Disabled</label><br/>
        <input type="submit" value="Register" />
        <Link to={'/login'}>
        <button>Login</button>
        </Link>
      </form>
    </div>
  )
}

export default App;
