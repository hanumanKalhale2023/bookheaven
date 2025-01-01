import Hero from "../components/Home/Hero"
import RecentlyAdded from "../components/Home/RecentlyAdded"

const Home = () => {
  return (
    <div className="h-full bg-zinc-900 text-white px-4 py-1  md:px-10 md:py-12 ">
        <Hero/>
        <RecentlyAdded/>
    </div>
  )
}

export default Home