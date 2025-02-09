import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {authActions } from "../Store/auth";
import { useDispatch } from "react-redux";
import { toast ,ToastContainer} from "react-toastify";
const LogIn = () => {
  const apiUrl =`https://bookstore-backend-dgaz.onrender.com/api/v1/`
  const navigate=useNavigate()
  const dispatch= useDispatch()
  const [value, setValue]=useState(
    {
      username:'',
      password:'',
    
      }
  )
  const changeHandler=(e)=>{
    setValue({...value,[e.target.name]:e.target.value})
  }
  const submitHandler=async ()=>{
  
    try{
      if(value.username ==="" || value.password ===""  ){
        toast.error('Please fill all fields')
        return
      }
      else{
        const response=await axios.post(`${apiUrl}signin`, value)
        dispatch(authActions.login())
        localStorage.setItem("id", response.data.id)
        localStorage.setItem("role", response.data.role)
        localStorage.setItem("token", response.data.token)
        toast.success('Logged In Successfully')
        navigate("/profile")


      }
    }catch(error){
      alert(error.response.data.message)
      return
    }
  }
  return (
    <div className="h-[88vh] md:h auto bg-zinc-900 px-8 py-4 md:px-12 md:py-8 flex items-center justify-center ">
    <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
      <p className="text-zinc-200 text-xl flex items-center justify-start">Sign In</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Username
            </label>
            <input type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Username"
              name="username"
              value={value.username}
              onChange={changeHandler}
              required
            />
          </div>
         
          <div>
            <label htmlFor="" className="text-zinc-400">
              Password
            </label>
            <input type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="password"
              name="password"
              required
              value={value.password}
              onChange={changeHandler}
            />
          </div>
          
          <div>
            <button  className="w-full mt-1 bg-blue-500 text-white  font-semibold py-2 rounded hover:bg-blue-800 "onClick={submitHandler}>
              SignIn
            </button>
            <ToastContainer />
            <p className="text-zinc-200 flex items-center justify-center">or</p>
            
              <p className="text-zinc-400"> Don't Have an Account? 
                <Link to="/signup" className="text-zinc-400 hover:text-blue-400">SignUp</Link>
               </p>
           
          </div>
        </div>
    </div>
    
  </div>
  )
}

export default LogIn