import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Login from './pages/Login'
import Register from './pages/Register'
import User from './pages/User'
import AddProduct from './pages/AddProduct'
import ViewProduct from './pages/ViewProduct'
import UpdateUser from './pages/UpdateUser'

const App = () => {
    return <div>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element = {<Login/>} />
                <Route path="/register" element = {<Register />} />
                <Route path="/dashboard" element = {<Dashboard />} />
                <Route path="/user" element = {<User />} />
                <Route path="/forgotpassword" element = {<ForgotPassword />} />
                <Route path="/addproduct" element = {<AddProduct />} />
                <Route path="/viewproduct" element = {<ViewProduct />} />
                <Route path="/resetpassword/:resetToken" element = {<ResetPassword />} />
                <Route path="/updateuser" element = {<UpdateUser />} />
            </Routes>
        </BrowserRouter>
    </div>
}

export default App