import React,{useState,useContext,} from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'

const ResetPassword  = ()=>{
    const history = useNavigate()
    const [password,setPasword] = useState("")
    const param = useParams()
    console.log(param)
    const PostData = ()=>{
        fetch('http://localhost:1337/api/resetpassword/:resetToken',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                param
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
                alert('Error change password')
           }
           else{
                alert('Password changed')
                history.push('/login')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
   return (
      <div>
          <div>
            <h2>New Password</h2>
        
            <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
            <button
            onClick={()=>PostData()}
            >
               Update Password
            </button>
    
        </div>
      </div>
   )
}


export default ResetPassword