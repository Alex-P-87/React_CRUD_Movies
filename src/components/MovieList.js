import { MovieContext } from "../context/MovieContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import './styleComponents/MovieList.css';

const MovieList = () => {
    const { movies } = useContext(MovieContext);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const searchMovies = (e) => {
        setSearch(e.target.value);
    }


    const filteredMovies = movies ? movies.filter((movie) => {
        return movie && movie.title && movie.title.toLowerCase().includes(search.toLowerCase());
    }) : [];
    

    return (
        <div>
            <div className="add-movie-btn-container">
            <button className="add-movie-btn" onClick={() => navigate('/new')}>🟢Add New Movie🟢</button>

            </div>
            <h1>Movies</h1>
            <input 
                type="text" 
                name="search"
                placeholder="🔍 Search Movies 🔍" 
                value={search}
                onChange={searchMovies}
            />
            
            <div className="movie-list">
                {filteredMovies.map((movie) => {
                    return (
                        <div className="movie-card-list" key={movie.id} >
                            <h5>{movie.title}</h5>
                            <p>{movie.description}</p>
                            <p>year: {movie.year}</p>
                            <button className="card-btn" onClick={() => navigate(`/movies/${movie.id}`)}>More Details</button>
                   
                        </div>
                    );
                })}
                
            </div>
        </div>
    )
}

export default MovieList;