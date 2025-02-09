import { useState,useEffect } from "react"
import axios from "axios"
import Loader from "../components/Loader/Loader"
import BookCard from "../components/BookCard/BookCard"

function AllBooks() {
  const apiUrl =`https://bookstore-backend-dgaz.onrender.com/api/v1/`
  const [book, setBook]=useState()
  useEffect(() =>{
     const fetch= async ()=>{
      const response=await axios.get(`${apiUrl}get-all-books`)
      setBook(response.data)
      
     }
     fetch();
     
  },[])
  return (
    <div className="bg-zinc-900 h-auto px-8 py-2 md:px-12 md:py-8">
      <h4 className="txt-3xl text-yellow-100 font-semibold">All Books</h4>
        {!book && <div className="flex items-center justify-center my-8 h-screen">
            <Loader></Loader>
            </div>}
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 text-white">
            {
                book && book.map((items, i)=>(
                    <div key={i}>
                      <BookCard data={items}/>{" "}
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default AllBooks
