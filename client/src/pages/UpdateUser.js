import { Axios } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

function App() {

    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newRole, setNewRole] = useState('')
    const [userstatus, setNewUserstatus] = useState('')

    const updateUser = (id) => {
        Axios.put('http://localhost:1337/api/updateuser', 
        {   
            id, 
            newName,
            newEmail,
            newPassword,
            newRole,
            setNewUserstatus
        })
    }

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={updateUser}>
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          type="text"
          placeholder="Name"
        /><br/>
        <input
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          type="email"
          placeholder="Email"
        /><br/>
        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="password"
          placeholder="Password"
        /><br/>
        <input
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          type="text"
          placeholder="Role"
        /><br/>
        <p>User Status:</p>
		    <input
          value="Active"
          onChange={(e) => setNewUserstatus(e.target.value)}
          type="radio"
          id="active"
          name="userstatus"
        />
        <label for="active">Active</label><br/>
        <input
          value="Disabled"
          onChange={(e) => setNewUserstatus(e.target.value)}
          type="radio"
          id="disabled"
          name="userstatus"
        />
        <label for="disabled">Disabled</label><br/>
        <input type="submit" value="Update" />
        <Link to={'/dashboard'}>
        <button>Login</button>
        </Link>
      </form>
    </div>
  )
}

export default App;
