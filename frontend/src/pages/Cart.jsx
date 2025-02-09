import axios from "axios"
import Loader from "../components/Loader/Loader"
import { useState , useEffect} from "react"
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const apiUrl =`https://bookstore-backend-dgaz.onrender.com/api/v1/`
  const navigate=useNavigate();
  const [cart, setCart] = useState()
  const [total, setTotal] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  useEffect(() => {
    const fetch=async ()=>{
      const response=await axios.get(`${apiUrl}get-cart`,{headers})
      setCart(response.data)
    }
    fetch();
  },[cart]);

  const deleteItem = async (bookid)=>{
    const response=await axios.put( `${apiUrl}remove-from-cart/${bookid}`,{},{headers})
    console.log(response.data.message)
  }

  useEffect(()=>{
    if(cart && cart.length > 0) {
      let totalPrice=0
      cart.map((items)=>{
        totalPrice+=items.price;
      });
      setTotal(totalPrice);
      totalPrice=0;
    }
   
  },[cart])

  const placeOrder = async ()=>{
      try{
        const response=await axios.post(`${apiUrl}place-order`,{order:cart},{headers})
        console.log(response.data.message)
        navigate('/profile/order-history')
      }
      catch(err){
          alert(err.message)
        console.error(err)
      }
  }
  return (
    <div className="bg-zinc-900 px-12 h-auto ">
    {!cart && <div className="flex items-center justify-center  h-screen"> <Loader/> </div>}
    {cart && cart.length === 0 &&(
      <div className="h-screen">
      <div className="h-[100%] flex items-center justify-center flex-col">
        <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-600">Empty Cart</h1>
        <img src="emptycart.png" alt="" />
      </div>
      </div>
      )}
      {cart && cart.length > 0 && (
        <div className="">
        <h1 className="text-5xl font-semibold text-zinc-400 mb-8 flex items-center justify-between">
          Your Cart <img src="emptycart.jpeg" alt=""className="h-[8vh] rounded mt-3 " />
        </h1>
        {cart.map((items,i)=>(
          <div className="w-full my-4 rounded flex flex-col md:flex-row   p-4 bg-zinc-800 justify-between items-center" key={i}>
            <img src={items.url} alt="" className="h-[15vh]"/>
            <div className="w-[88vh] md:w-auto">
              <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                {items.title}
              </h1>
              <p className="text-xl text-zinc-300 font-semibold text-start mt-2 md:mt-0">
                by {items.author}
              </p>
              <p className="text-xl text-zinc-300 font-semibold text-start mt-2 md:mt-0">
                Price: ₹ {items.price}
              </p>
            
            </div>
            <div>  
              <button className="bg-red-600 text-4xl rounded" onClick={()=>deleteItem(items._id)}>
              <MdOutlineDeleteOutline />
            </button>
            </div>

          </div>
        ))}
        </div>
      )}
      {
        cart && cart.length > 0 && (
          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded">
              <h1 className="text-3xl text-zinc-200 font-semibold">
                Total Amount
              </h1>
              <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
              <h2>{cart.length} books</h2><h2>₹{total}</h2>
              </div>
              <div className="w-auto mt-3 px-3 ">
                <button className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full
                font-semibold hover:bg-zinc-300" onClick={()=>placeOrder()}>Place Your Order</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Cart