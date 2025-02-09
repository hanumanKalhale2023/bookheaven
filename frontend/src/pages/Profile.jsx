import { Outlet } from "react-router-dom"
import Sidebar from "../components/Profile/Sidebar"
import { useEffect, useState } from "react"
import axios from "axios"
import Loader from "../components/Loader/Loader"
import MobileNav from "../components/Profile/MobileNav"
const Profile = () => {
 const apiUrl =`https://bookstore-backend-dgaz.onrender.com/api/v1/`

  const [profile, setProfile] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  console.log(headers.id)
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${apiUrl}user-info`, { headers })
      setProfile(response.data);
      console.log(response.data);
    }
    fetch();
  }, [])
  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex flex-col  py-8 gap-4 text-white">
      {!profile &&
        <> 
       <div className="flex items-center justify-center  h-screen"> <Loader/> </div>
        </>
      }
      {profile && profile.role==="user" &&
       <div className="flex flex-row">
        <div className="w-full md:w-1/6 h-screen mr-4">
          <Sidebar data={profile} />
        </div>
        <div className="w-full md:w-5/6">
          <Outlet />
        </div>
      </div>
      }
      {profile && profile.role==="admin" &&
       <div className="flex flex-row">
        <div className="w-full md:w-1/6 h-screen mr-4">
          <Sidebar data={profile} />
          <MobileNav/>
        </div>
        <div className="w-full md:w-5/6">
          <Outlet />
        </div>
      </div>
      }
    </div>
  )
}

export default Profile