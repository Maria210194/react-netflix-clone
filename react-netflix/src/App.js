import React from "react";
import {useState, useEffect} from "react";
import MovieCard from "./MovieCard";

import './App.css';
// import SearchIcon from './search.svg';



const API_URL = 'http://www.omdbapi.com?apikey=24024960';

const movie1 = {
    Poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    Title : "Interstellar",
    Type : "movie",
    Year : "2014",
    imdbID : "tt0816692"
}


const App = () => {

    const[movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    const handleKeyDown = event => {
        console.log('User pressed: ', event.key);
    
        // console.log(message);
    
        if (event.key === 'Enter') {
          // 👇️ your logic here
          searchMovies(searchTerm)
          console.log('Enter key pressed ✅');
        }
    }


    useEffect(() => {
        searchMovies('Interstellar');
    }, []);
    return (
        <div className="app">
            <h1>Neftlix</h1>
            <div className="search">
                <input
                placeholder="Search.."
                value={searchTerm}
                onChange={(e)=> setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                />
                {/* <img src={SearchIcon}
                    alt="search"
                    onClick={()=> setState(searchTerm)}
                /> */}
            </div>

            { movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie)=>(
                            <MovieCard movie={movie} key={movie.imdbID} />
                        ))}
                    </div>
                ) : 
                (
                    <div className="empty">
                        <h2>Nothing found :(</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App;