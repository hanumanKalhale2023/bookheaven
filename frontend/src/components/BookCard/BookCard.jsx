import { Link } from "react-router-dom"
import axios from "axios"
const BookCard = ({data,favourite}) => {
  const apiUrl =`http://localhost:3000/api/v1/`
 //console.log("book Id", data._id)
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:`${data._id}`,
  }

    const removeHandler = () => {
      const fetch= async ()=>{
        const response = await axios.put(`${apiUrl}remove-book-from-favourites`,{},{headers})
        alert(response.data.message)
      }
      fetch();
    }

  return (
    <>
    <Link to={`/view-book-details/${data._id}`}>
    <div className="bg-zinc-800 rounded p-4 flex flex-col" >
        <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[30vh]"/>
            </div>
            <h2 className="mt-2 text-xl font-semibold ">{data.title}</h2>
            <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
            <p className="mt-2 text-zinc-400 font-semibold text-xl">
            ₹{data.price}
            </p>
    </div>
    </Link>
    {favourite && (
      <button className="bg-yellow-50 px-6 py-2 rounded border border-yellow-500 text-yellow-500 mt-1" onClick={removeHandler}>Remove from cart</button>
    )}
    </>
  )
}

export default BookCard