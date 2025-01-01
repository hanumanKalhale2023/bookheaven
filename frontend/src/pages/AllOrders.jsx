import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { DiVim } from 'react-icons/di';
import Loader from '../components/Loader/Loader';
import { FaRegUser } from "react-icons/fa";

const AllOrders = () => {
    const apiUrl =`http://localhost:3000/api/v1/`
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
      const [AllOrders, setAllOrders] = useState();

    useEffect(()=>{
        const fetch = async () => {
            try{
            const response=await axios.get(`${apiUrl}all-orders`,{headers})
            console.log(response.data)
            setAllOrders(response.data)
            }catch(e){
                console.error(e)
            }
        }
        fetch();
    } , []);
  return (
    <>
    {!AllOrders && <div className='h-screen flex items-center justify-center'><Loader/></div>}{" "}
    {AllOrders && AllOrders.lenght >0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100 '>
            <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
                All Orders
            </h1>
            <div className='mt-4 bg-zinc-800 py-2 px-4 w-full rounded flex gap-2'>
                <div className='w-[3%]'>
                    <h1 className='text-center'>Sr.</h1>
                </div>
                <div className='w-[40%] md:w-[22%]'>
                    <h1>Books</h1>
                </div>
                <div className='w-0 md:w-[45%] hidden md:block'>
                    <h1>Description</h1>
                </div>
                <div className='w-[17%] md:w-[9%]'>
                    <h1>Price</h1>
                </div>
                <div className='w-[10%] md:w[5%]'>
                    <h1><FaRegUser />
                    </h1>
                </div>
            </div>
            {AllOrders.map((items,i)=>(
                <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:cursor-pointer transition-all duration-150'>
                    <div className='w-[3%]'>
                        <h1 className='text-center'>{i + 1}</h1>
                    </div>
                    <div className='w-[40%] md:w-[22%]'>
                        <Link to={`view-book-details/${items.book._id}`} className="hover:text-blue-400">
                        {items.book.title}
                        </Link>
                    </div>
                    <div className='w-[17%] md:w-[9%]'>
                        <h1>{items.book.price}</h1>
                    </div>
                </div>
            ))
            }
        </div>
        )}
    </>
  )
}

export default AllOrders