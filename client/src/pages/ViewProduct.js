import React, { useState, useEffect} from 'react';
import Axios from 'axios'

const ViewProduct = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:1337/api/get-product').then(res => {
          setData(res.data.data.allProduct)
        })
      },[])

      return (
        <div>
            <h1>Product List</h1>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Category</th>
                        <th>Product Sub Category</th>
                        <th>Product Price</th>
                        <th>Product Quantity</th>
                        <th>Product Description</th>
                    </tr>
                </thead>
            </table>
            <tbody>
                 {Object.keys(data).map((id, index) => {
                   return(
                     <tr key={id}>
                       <th scope="row">{index + 1}</th>
                       <td>{data[id].productname}</td>
                       <td>{data[id].productcat}</td>
                       <td>{data[id].productsubcat}</td>
                       <td>{data[id].productprice}</td>
                       <td>{data[id].productqty}</td>
                       <td>{data[id].productdesc}</td>
                       <td>
                         <button
                            >Edit
                         </button>
                         <button
                            >Delete
                        </button>
                         <button>View  </button>
                       </td>
                     </tr>
                   );
                 })}
               </tbody>
        </div>
      );

    }

export default ViewProduct