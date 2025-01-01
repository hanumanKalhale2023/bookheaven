import { Link, useNavigate } from "react-router-dom"
import { authActions } from "../../Store/auth"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { MdLogout } from "react-icons/md";

const Sidebar = ({data}) => {
    //const isLoggedIn= useSelector()
  const dispatch=useDispatch()
   const history= useNavigate()
   const role= useSelector((state)=>state.auth.role)
  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-[88vh]'>
   <div className="flex flex-col items-center justify-center">
   <img src={data.avtar} alt="" className="h-[15vh]"/>
    <p className="mt-3 text-xl text-zinc-100 font-semibold">{data.username}</p>
    <p className="mt-3 text-normal text-zinc-300">{data.email}</p>
    <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
   </div>
   {
    role==="user" &&  <div className="w-full flex-col items-center justify-center  lg:flex">
    <Link to="/profile"
     className="text-zinc-100 font-semibold w-full py-2 text-center
     hover:bg-zinc-900 rounded transition-all">
        Favourites
     </Link>
    <Link to="/profile/order-history"
    className="text-zinc-100 font-semibold w-full py-2 text-center
    hover:bg-zinc-900 rounded transition-all">
        Order History
    </Link>
    <Link to="/profile/settings"
    className="text-zinc-100 font-semibold w-full py-2 text-center
    hover:bg-zinc-900 rounded transition-all">
        Settings
    </Link>
    </div>
   }
   {role==="admin" &&(
    <div className="w-full flex-col items-center justify-center  lg:flex">
    <Link to="/profile"
     className="text-zinc-100 font-semibold w-full py-2 text-center
     hover:bg-zinc-900 rounded transition-all">
        All Orders
     </Link>
    <Link to="/profile/add-book"
    className="text-zinc-100 font-semibold w-full py-2 text-center
    hover:bg-zinc-900 rounded transition-all">
        Add Book
    </Link>
    
    </div>
   ) }
    <button className="bg-zinc-500 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center
    py-2 rounded hover:text-white hover:bg-zinc-900 transition-all duration-300 gap-2"
    onClick={()=>{
      dispatch(authActions.logout());
      dispatch(authActions.changeRole("user"));
      localStorage.clear("id");
      localStorage.clear("token");
      localStorage.clear("role");
      history("/")
    }}>
    Log Out <MdLogout />

    </button>
    </div>
  )
}

export default Sidebar