import { useState , useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const UpdateBook = () => {
    const apiUrl =`http://localhost:3000/api/v1/`
    const { id } = useParams();
    const navigate = useNavigate();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
      }
    const [Data, setData] = useState({
        url: '',
        title: '',
        author: '',
        language: '',
        price: '',
        description: ''
    });
    const change = (e) => {
        setData({...Data, [e.target.name]: e.target.value });
    };
    
    const submit=async ()=>{
        try{
        if(
            Data.url === '' ||
            Data.title === '' ||
            Data.author === '' ||
            Data.language === '' ||
            Data.price === '' ||
            Data.description === ''
        ){
            toast.error("all fields are required")
        }
        else{
            const response=await axios.put(`${apiUrl}update-book`,Data,{headers})
            toast.success(response.data.message);
            setData({
                url: '',
                title: '',
                author: '',
                language: '',
                price: '',
                description: ''
            })
            navigate(`/view-book-details/${id}`);
        }
        }catch(error){
            toast(error.message);
        }
    }
    useEffect(() =>{
        const fetch= async ()=>{
         const response=await axios.get(`${apiUrl}get-book/${id}`,{headers})
         setData(response.data)
         console.log(response.data)
         
        }
        fetch();
    },[]);
  return (
      <div className='bg-zinc-900 h-[100%] p-0 md:p-4'>
            <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
                Update Book
            </h1>
            <div className='p-4 bg-zinc-800 rounded'>
                <div>
                    <label htmlFor="" className='text-zinc-400 '>Image</label>
                    <input type='text' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                    placeholder='image url' name='url' required value={Data.url} onChange={change} />
                </div>
              
                <div>
                    <label htmlFor="" className='text-zinc-400 '>Title</label>
                    <input type='text' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                    placeholder='book title' name='title' required value={Data.title} onChange={change} />
                </div>
                <div>
                    <label htmlFor="" className='text-zinc-400 '>Author of Book</label>
                    <input type='text' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                    placeholder='author of book' name='author' required value={Data.author} onChange={change} />
                </div>
                <div>
                    <label htmlFor="" className='text-zinc-400 '>Language</label>
                    <input type='text' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                    placeholder='language of book' name='language' required value={Data.language} onChange={change} />
                </div>
                <div>
                    <label htmlFor="" className='text-zinc-400 '>Price</label>
                    <input type='text' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                    placeholder='price of book' name='price' required value={Data.price} onChange={change} />
                </div>
                <div>
                    <label htmlFor="" className='text-zinc-400 '>Description</label>
                    <input type='text' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
                    placeholder='description of book' name='description' required value={Data.description} onChange={change} />
                </div>
                <button className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-100'
                onClick={submit}>Update Book</button><ToastContainer/>
            </div>
        </div>
  )
}

export default UpdateBook