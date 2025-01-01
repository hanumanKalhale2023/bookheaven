import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BookCard from "../BookCard/BookCard"
const Favourites = () => {
  const apiUrl =`http://localhost:3000/api/v1/`
  const [favouriteBooks, setFavouriteBooks] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  useEffect(()=>{
    const fetch=async ()=>{
      const response=await axios.get(`${apiUrl}get-favourite-books`, {headers});
     console.log(response.data.favourites)
      setFavouriteBooks(response.data.favourites)
    }
    fetch();
    
  },[favouriteBooks])

  return (
    <div className='grid grid-cols-4 gap-4'>
      
      {
        favouriteBooks && favouriteBooks.map((item,i)=>(
          <div key={i}><BookCard data={item} favourite={true}/></div>
        ))
      }
      {
        favouriteBooks && favouriteBooks.length===0 && <h2 className=" text-2xl text-white bg-red-200 flex items-center justify-center  px-16 w-[auto]">No Favourites Found <img src="public\emptyfav.png" alt="no favourite" /></h2>
      }
    </div>
  )
}

export default Favourites