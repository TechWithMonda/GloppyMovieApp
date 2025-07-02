import MovieCard from "../components/MovieCard"
import { useState,useEffect } from "react";
import "../css/Home.css"

import { searchMovies,getPopularMovies } from "../services/api";
 
function Home(){
    const[searchQuery,setSearchQuery]=useState('');
    const[movies,setMovies]=useState([]);

    const[error,setError]=useState(null);

    const[loading,setLoading]=useState(true);



useEffect(()=>{
const loadPopularMovies = async ()=>{


    try{
    const PopularMovies = await getPopularMovies()
    setMovies(PopularMovies)
    }catch (err){
        console.log(err)
        setError('failed to load movies.........')
    }
    finally{
        setLoading(false)
    }

}
loadPopularMovies()
},[])

const handleSearch = (e) =>{
    e.preventDefault()
    alert(searchQuery)
};



return <div className="home">
    <form onSubmit={handleSearch} className="search-form">
        <input
         type="text" 
         placeholder="Search for Movies..." 
         className="search-input"
         value={searchQuery}
         onChange={(e) => setSearchQuery(e.target.value)}
         />
        <button type="submit" className="search-button">Search</button>
    </form>


    <div className="movies-gird">
        {movies.map(movie =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
        <MovieCard movie={movie} key={movie.id} />))}

    </div>

</div>
}

export default Home
