import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Navbar = () => {

        const links=[
            {
                title:'Home',
                link:'/'
            },
            {
                title:'All Books',
                link:'/all-books'
            },
            {
                title:'Cart',
                link:'/cart'
            },
            {
                title:'Profile',
                link:'/profile'
            },
            {
                title:'Admin Profile',
                link:'/profile'
            }
        ];
      const isLoggedIn=  useSelector((state)=>state.auth.isLoggedIn);
      const role=useSelector((state)=>state.auth.role);
      if(isLoggedIn===false) {
        links.splice(2,2);
      }
      if(isLoggedIn===true && role==="user"){
        links.splice(4,1);
      } 
      if(isLoggedIn===true && role==="admin"){
        links.splice(2,2);
        //links.splice();
      } 
      if(isLoggedIn===false){
        links.splice(2,1);
      }
  return(
    <>
    <nav className='relative z-50 flex bg-zinc-800 px-8 py-2 text-white items-center justify-between'>
        <div className='flex items-center'>
            <img className='h-10 me-4' src="http://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="" />
            <h1 className='text-2xl font-semibold'><Link to="/">BookHeaven</Link></h1>
            </div>
        <div className='nav-links-bookheaven block md:flex items-center gap-4'>
            <div className='hidden lg:flex gap-4'>
                {
                 links.map((items,i)=>(
              <>
              {
                items.title==="Profile" || items.title==="Admin Profile" ?  ( <Link to={items.link} className=" border border-blue-500 rounded hover:bg-white hover:text-blue-800 transition-all duration-300" key={i}>
                {items.title}{""}
             </Link>)
              :(
                <Link to={items.link} className="hover:text-blue-500 trnasition-all duration-300" key={i}>
                {items.title}{""}
             </Link>
              )}
              </>
                 ))}
            </div>
            {
                isLoggedIn===false &&
                <div className='flex gap-4'>
                    <Link to="/signin" className='px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300' >LogIn</Link>
                    <Link to="/signup" className='px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300' >SignUp</Link>
                </div>
            }
           
            {/* <button className="text-white text-2xl">
            <FaGripLines />
            </button> */}
        </div>
      
    </nav>    
    </>
  )
}

export default Navbar