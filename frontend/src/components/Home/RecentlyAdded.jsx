import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import BookCard from "../BookCard/BookCard"
import Loader from "../Loader/Loader"
const RecentlyAdded = () => {
    const [book, setBook]=useState()
    useEffect(() =>{
       const fetch= async ()=>{
        const response=await axios.get("http://localhost:3000/api/v1/get-recent-books")
        setBook(response.data)
        
       }
       fetch();
       
    },[])
  return (
    <div className="mt-8 mx-4">
        <h4 className="txt-3xl text-yellow-100 font-semibold">Recently Added Books</h4>
        {!book && <div className="flex items-center justify-center my-8">
            <Loader></Loader>
            </div>}
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
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

export default RecentlyAdded