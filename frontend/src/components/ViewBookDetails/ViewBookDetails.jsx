import { useState,useEffect } from "react"
import axios from "axios"
import Loader from "../Loader/Loader"
import { useParams } from "react-router-dom"
import { MdOutlineLanguage } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import { Link } from "react-router-dom";
const ViewBookDetails = () => {
  const apiUrl =`http://localhost:3000/api/v1/`
  const navigate=useNavigate()
  const{id}=useParams()
  const [book, setBook]=useState("")
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
  const role=useSelector((state)=>state.auth.role)

  useEffect(() =>{
     const fetch= async ()=>{
      const response=await axios.get(`${apiUrl}get-book/${id}`)
      setBook(response.data)
      console.log(response.data)
      
     }
     fetch();
     
  },[])

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:id,
  }
  const handlerFavourite=  ()=>{
    const fetch=async ()=>{
      //check data is already in favourites
      const response=await axios.put(`${apiUrl}add-book-to-favourites`,{},{ headers });
      console.log(response.data.message)
      toast.success("Successfully added")
    }
    fetch();
  }
  const cartHandler=  ()=>{
    const fetch=async ()=>{
      const response=await axios.put(`${apiUrl}add-book-to-cart`,{},{ headers });
      toast.success(response.data.message)
      navigate("/cart")
    }
    fetch();
  }
  const deleteBook = async ()=>{
    const response=await axios.delete(`${apiUrl}delete-book`,{ headers })
    console.log(response.data.message)
    alert(response.data.message)
    toast.success("Book deleted successfully")
    navigate("/all-books")
  }
  return (
  <>
  {book &&   <div className="px-4 lg:px-12 py-8 bg-zinc-900 flex flex-col   lg:flex-row gap-8">
        <div className="bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex  items-center justify-around px-4 py-12 gap-8">{" "}<img className="h-[50vh] lg:h-[80vh] rounded" src={book.url} alt="book" />
       {
        isLoggedIn=== true && role === 'user' &&  <div className="flex md:flex-col py-2  gap-2"><button className="bg-white rounded-full p-2 text-3xl text-red-500 "><FaHeart onClick={handlerFavourite}/></button>
        <ToastContainer/>
        <button className="bg-white rounded-full p-2  text-3xl mb-80 text-blue-500"><FaShoppingCart onClick={cartHandler} />
        </button>
        <ToastContainer/>
        </div>
       }
       {
        isLoggedIn=== true && role === 'admin' &&  <div className="flex flex-col md:flex-col py-2  gap-2">
          <Link to={`/updateBook/${id}`} className="bg-white rounded-full p-2 text-3xl text-red-500 "><FaEdit />
          </Link><ToastContainer/>
        <button className="bg-white rounded-full p-2  text-3xl mb-80 text-blue-500" onClick={deleteBook}><MdDelete />

        </button>
        <ToastContainer/>
        </div>
       }
        </div>
        <div className="w-full lg:w-3/6 text-white">
        <h1 className="text-4xl text-zinc-300 font-semibold">{book.title}</h1>
        <p className="text-zinc-400 mt-1">by {book.author}</p>
         <p className="text-zinc-500 mt-1 flex items-center gap-2">
         <MdOutlineLanguage />{book.language}</p>
        
        <p className="flex items-center justify-start text-zinc-500 mt-4 ">Description: {book.description}</p>
        <p className="mt-4 text-zinc-100 text-3xl font-semibold">Price: ₹ {book.price}</p>
        
        </div>
    </div>
    }
    {!book && <div className="h-screen bg-zinc-900 flex items-center justify-center"><Loader/></div>}
  </>
  )
}

export default ViewBookDetails