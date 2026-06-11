import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center px-6'>
        
            <h1 className='text-4xl font-bold mb-2'>Welcome to PopX</h1>

            <p className='text-gray-500 text-center max-w-xs text-xl mb-8'
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia perspiciatis rerum possimus dicta porro, eum consequuntur quod vero beatae recusandae, vitae placeat blanditiis non quos minus doloremque sequi facere? Nihil.</p> 

            <div className='w-full max-w-xs space-y-3'>
                <button
                onClick={()=> navigate("/signup")}
                className='w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition"'>Create account</button>
                <button 
                onClick={()=> navigate("/login")}
                className='w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition"'>Already Registered? Login</button>   
            </div>  
        

        
    </div>
  )
}

export default Dashboard