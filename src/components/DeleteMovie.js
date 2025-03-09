import axios from "axios";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import './styleComponents/DeleteMovie.css';

const DeleteMovie = () => {
    const { id } = useParams();
    const { movies, setMovies } = useContext(MovieContext);
    const navigate = useNavigate();

    const movie = movies.find(movie => movie.id === (id));

    if (!movie) {
        return (
            <div>
                <h2>Movie not found</h2>
                <button onClick={() => navigate('/')}>Back</button>
            </div>
        );
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/movies/${id}`);
            setMovies(movies.filter(movie => movie.id !== (id)));
            navigate('/');
        } catch (error) {
            console.error("There was an error deleting the movie!", error);
        }
    };

    return (
        <div className="delete-movie">
            <h1>Are you sure you want to delete the movie "{movie.title}"?</h1>
            <button className="yes-delete" onClick={handleDelete}>Yes, Delete</button>
            <button className="cencel-delete" onClick={() => navigate('/')}>Cancel</button>
        </div>
    );
};

export default DeleteMovie;