import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";
import './styleComponents/MovieDetails.css';

const MovieDetails = () => {
    const { id } = useParams();
    const { movies } = useContext(MovieContext);
    const navigate = useNavigate();

    if (!movies || movies.length === 0) {
        return <div>Loading movies...</div>;
    }

    const movie = movies.find(movie => movie.id === (id));

    if (!movie) {
        return(
            <div>
             <h2 className="not-found">Movie with id <b>{id}</b> not found!</h2>
            <Link to={'/'}>
                <button>Back</button>
            </Link>
            </div>
        ) 
    }

    return (
        <div>
            <h1>Movie details</h1>
        <div className="container">
          <div className="movie-card ">
            <h2>{movie.title}</h2>
            <p>Director: {movie.director}</p>
            <p>Genre: {movie.genre.join(', ')} </p>
            <p>Year: {movie.year}</p>
            <p>Duration: {movie.duration} min</p>
            <p>Rate: {movie.rate}</p>
            <button className="edit-btn" onClick={() => navigate(`/edit/${movie.id}`)}>Edit Movie</button>
            <button className="delete-btn" onClick={() => navigate(`/delete/${movie.id}`)}>Delete Movie</button>
          </div>          
        </div>
        <Link to={'/'}>
                <button className="back-btn">Back</button>
            </Link>
        </div>
            
    );
};


export default MovieDetails;