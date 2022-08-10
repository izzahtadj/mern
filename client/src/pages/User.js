import React, { useState, useEffect} from 'react';
import Axios from 'axios'
import { Link } from 'react-router-dom'

const User = () => {
    const [data, setData] = useState([])
    const [newData, setNewData] = useState('')

    useEffect(() => {
        Axios.get('http://localhost:1337/api/get-user').then(res => {
          setData(res.data.data.allUser)
        })
      },[])

      const deleteUser = (id) => {
        Axios.delete('http://localhost:1337/api/deleteUser/${id}')
      }

      return (
        <div>
            <h1>User List</h1>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
            </table>
            <tbody>
                 {Object.keys(data).map((id, index) => {
                   return(
                     <tr key={id}>
                       <th scope="row">{index + 1}</th>
                       <td>{data[id].name}</td>
                       <td>{data[id].email}</td>
                       <td>{data[id].contact}</td>
                       <td>
                       <Link to={'/updateuser'}>
                        <button>View</button>
                        </Link>
                       </td>
                     </tr>
                   );
                 })}
               </tbody>
        </div>
      );

    }

export default User