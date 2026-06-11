import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import API_URL from '../config/api'

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName : "",
        phoneNumber: "",
        email:"",
        password:"",
        companyName:"",
        isAgency:"yes",

    })

    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            const response = await axios.post(`${API_URL}/api/auth/signup`,formData)
            console.log(response.data)
            setMessage("Signup successful! Redirecting to login...")

            setTimeout(()=>{
                navigate("/login")
            },2000)
        }catch(error){
            console.log(error.response.data)
            setMessage("Signup Failed")
        }

    }
  return (
    <div className='min-h-screen bg-gray-100 flex justify-center'>
        <div className='w-full max-w-sm px-5 py-10'>
            <h1 className='text-4xl font-bold mb-10'>Create your PopX account</h1>

            <form onSubmit={handleSubmit}>
                <div className='mb-6'>
                    <label className='text-purple-600 text-sm font-semibold'>Full Name<span className='text-red-500'>*</span></label>
                    <input type="text"
                    value={formData.fullName}
                    name="fullName" 
                    placeholder='Marry Doe'
                    className='w-full border border-gray-400 rounded-md p-2 mt-1'
                    onChange={handleChange} />   
                </div>

                <div className='mb-6'>
                    <label className='text-purple-600 text-sm font-semibold'>Phone number<span className='text-red-500'>*</span></label>
                    <input type="text" 
                    value={formData.phoneNumber}
                    name="phoneNumber"
                    placeholder='Marry Doe'
                    className='w-full border border-gray-400 rounded-md p-2 mt-1'
                    onChange={handleChange} />   
                </div> 

                <div className='mb-6'>
                    <label className='text-purple-600 text-sm font-semibold'>Email address<span className='text-red-500'>*</span></label>
                    <input type="text" 
                    value={formData.email}
                    placeholder='Marry Doe'
                    name="email"
                    className='w-full border border-gray-400 rounded-md p-2 mt-1' 
                    onChange={handleChange}/>   
                </div> 

                <div className='mb-6'>
                    <label className='text-purple-600 text-sm font-semibold'>Password<span className='text-red-500'>*</span></label>
                    <input type="password" 
                    value={formData.password}
                    name="password"
                    placeholder='Marry Doe'
                    className='w-full border border-gray-400 rounded-md p-2 mt-1'
                    onChange={handleChange} />   
                </div>  

                <div className='mb-6'>
                    <label className='text-purple-600 text-sm font-semibold'>Company Name</label>
                    <input type="text" 
                    value={formData.companyName}
                    name="companyName"
                    placeholder='Marry Doe'
                    className='w-full border border-gray-400 rounded-md p-2 mt-1'
                    onChange={handleChange} />   
                </div> 

                <div className='mb-8'>
                    <p className='font-medium mb-3'>Are you an Agency? </p>
                    <div className='flex gap-6'>
                        <label className='flex items-center gap-2'>
                            <input type="radio" name="isAgency" value="yes" 
                            className='accent-purple-600'
                            checked={formData.isAgency === "yes"}
                            onChange={handleChange} />
                            Yes
                        </label>

                        <label className='flex iems-center gap-2'>
                            <input type="radio" name="isAgency" value="no"
                            className='accent-purple-600'
                            checked={formData.isAgency === "no"}
                            onChange={handleChange}
                             />
                            No
                        </label>

                    </div>
                </div>

                <button type="submit"
                className='w-full py-3 bg-purple-600 rounded-md text-white font-semibold hover:bg-purple-700'>Create Account</button>
            </form>

            {message && (
                <p className='text-green-600 text-center mb-4'>{message}</p>
            )}

        </div>
    </div>
  )
}

export default Signup