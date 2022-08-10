import { Link,useNavigate } from 'react-router-dom'
import React,{useState,useContext,} from 'react'
import axios from 'axios'

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const sendEmail = async (e) => {
		e.preventDefault();
		try {
			const url = 'http://localhost:1337/api/forgotpassword';
			const { data } = await axios.post(url, { email });
			setMsg(data.message);
			setError("");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};

    return (
        <div>
            <h1>Forgot Password</h1>
            <form onSubmit={sendEmail}>
                <input
                    value={email}
                    type="email"
                    placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <br/>
                <input type="submit" value="Send" />
                <Link to={'/login'}>
                <button>Login</button>
                </Link>
            </form>
        </div>
    )
}

export default ForgotPassword