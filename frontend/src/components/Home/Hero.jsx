import { useNavigate } from "react-router-dom"
const Hero = () => {
    const navigate=useNavigate()
    const discover=()=>{
        navigate('/all-books')
    }
    return (
        <div className='h-[70vh] flex'>
            <div className='w-full md:w-3/6 flex flex-col items-start justify-center'>
                <h1 className='text-4xl md:text-5xl font-semibold text-yellow-100'>Discover Your Next Great Read</h1>
                <p className='mt-4 text-xl text-zinc-300 text-center md:text-left'>Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books.</p>
                <div className='mt-8 w-auto md:w-auto'>
                    <button className='sm:text-xl sm:justify-center  text-yellow-100 text-xl md:text-2xl  font-semibold border border-yellow-100 mt-4 px-10 py-2 rounded-full hover:bg-zinc-800' onClick={discover}>Discover Books</button>
                </div>
            </div>
            <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center rounded-full'>
                <img className='rounded-full' src="hero.png" alt="hero" />
            </div>
        </div>
    )
}

export default Hero