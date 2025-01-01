import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
const Settings = () => {
  const apiUrl =`http://localhost:3000/api/v1/`
  const [value, setValue]=useState({ address:''  })
  const [profileData, setProfileData]=useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  useEffect(()=>{
    const fetch= async ()=>{
      const response = await axios.get( `${apiUrl}user-info`,{headers})
      console.log(response.data)
      setProfileData(response.data)
      setValue({address:response.data.address})
    }
    fetch();
  },[])
  const change=(e)=>{
  const  { name,value}=e.target;
    setValue({...value, [name]:value})
  }

  const submitAddress= async()=>{
    const response = await axios.put("http://localhost:3000/api/v1/update-address",value,{headers})
    console.log(response)
    toast.success("Address updated successfully")
  }
  return (
    <>
    {!profileData && <Loader/>}{" "}
    {
      profileData &&
      <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
        <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
          Settings
        </h1>
        <div className='flex gap-12'>
          <div>
            <label htmlFor="">Username</label>
            <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
              {profileData.username}
            </p>
          </div>
          <div>
            <label htmlFor="">Email</label>
            <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
              {profileData.email}
            </p>
          </div>
          </div> 
          <div className='mt-4 flex flex-col'>
            <label htmlFor="">Address</label>
          <textarea name="address" id="" className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
          rows="5" placeholder='Address' value={value.address} onChange={change}>
          </textarea>
          </div>
          <div className='mt-4 flex justify-end'>
           <button className='bg-yellow-500 text-zinc-800 font-semibold px-3 py-2 rounded hover:bg-yellow-300' onClick={submitAddress}>
             Update Address
           </button>
           <ToastContainer/>
          </div>
        
      </div>
    }
    </>
  )
}

export default Settings