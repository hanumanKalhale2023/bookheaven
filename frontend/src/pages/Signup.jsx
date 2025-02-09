import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";

function Signup() {
  const apiUrl =`https://bookstore-backend-dgaz.onrender.com/api/v1/`
  const navigate=useNavigate()
  const [value, setValue]=useState(
    {
      username:'',
      email:'',
      password:'',
      address:'',
      }
  )
  const changeHandler=(e)=>{
    setValue({...value,[e.target.name]:e.target.value})
  }
  const submitHandler=async ()=>{
  
    try{
      if(value.username ==="" || value.password ==="" || value.email ==="" || value.address ==="" ){
        toast.error('Please fill all fields',{ position: "bottom-center" })
        
        return
      }
      else{
        const response=await axios.post(`${apiUrl}signup`, value)
        console.log(response.data)
        toast.success("Successfully signed up",{position:"top-right"})
        navigate('/SignIn')

      }
    }catch(error){
      alert('Failed to signup')
      console.error(error)
      return
    }
  }
  return (
    <div className="h-[88vh] md:h-full bg-zinc-900 px-4 md:px-12 py-8 flex items-center justify-center ">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full mg:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl flex items-center justify-start">Sign UP</p>
          <div className="mt-4">
            <div>
              <label htmlFor="" className="text-zinc-400">
                Username
              </label>
              <input type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="Username"
                name="username"
                required
                value={value.username}
                onChange={changeHandler}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="" className="text-zinc-400">
                Email
              </label>
              <input type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="xyz@gmail.com"
                name="email"
                required
                value={value.email}
                onChange={changeHandler}
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
              <label htmlFor="" className="text-zinc-400">
                Address
              </label>
              <textarea type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="Address"
                name="address"
                required
                value={value.address}
                onChange={changeHandler}
              />
            </div>
            <div>
              <button  className="w-full bg-blue-500 text-white  font-semibold py-2 rounded hover:bg-blue-800 "onClick={submitHandler}>
                SignUp
              </button>
              <ToastContainer />
              <p className="text-zinc-200 flex items-center justify-center">or</p>
              
                <p className="text-zinc-400">Already have an account? 
                  <Link to="/signin" className="text-zinc-400 hover:text-blue-400">Sign In</Link>
                 </p>
             
            </div>
          </div>
      </div>
      
    </div>
  )
}

export default Signup

