import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './styleComponents/EditMovie.css';

const EditMovie = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [genre, setGenre] = useState([]);
    const [year, setYear] = useState(1990);
    const [duration, setDuration] = useState(100);
    const [rate, setRate] = useState(7.5);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/movies/${(id)}`);
                const movie = response.data;
                setTitle(movie.title);
                setDirector(movie.director);
                setGenre(movie.genre);
                setYear(Number(movie.year));
                setDuration(Number(movie.duration));
                setRate(Number(movie.rate));
                
            } catch (error) {
                console.error("There was an error fetching the movie!", error);
            }
        };
        fetchMovie();
    }, [id]);

    const handleGenreChange = (e) => {
        const selectedGenre = e.target.value;
        if (genre.includes(selectedGenre)) {
            setGenre(genre.filter(g => g !== selectedGenre));
        } else if (genre.length < 3) {
            setGenre([...genre, selectedGenre]);
        }
    };

    const showGenere = () => {
        const remaining = 3 - genre.length;
        return `You can add ${remaining} more genre(s)`;
    };

    const updateMovie = async (e) => {
        e.preventDefault();
        const updatedMovie = { title, director, genre, year: parseInt(year), duration, rate };
        try {
            await axios.put(`http://localhost:5000/movies/${id}`, updatedMovie);
              
            
            navigate('/successfully', {
                state: {
                    text1: "movie update successfully",
                    text2: "back",
                    text3: "add new movie"
                }
            });
        } catch (error) {
            console.error("🔴 There was an error updating the movie!", error);
        }
    };

    const handleBack = () => {      
        navigate(-1);  
    };

    return (
        <div>
        <h1>Edit Movie</h1>
        <div className="container">
        <div className="edit-movie-card">
        <div className="edit-movie-form">      
            <form onSubmit={updateMovie}>
                <label>Title:</label>
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label>Director:</label>
                <input 
                    type="text"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                />
                <label>Genre:</label>
                <div>
                    <select 
                        multiple 
                        value={genre} 
                        onChange={handleGenreChange}
                        required
                    >
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Crime">Crime</option>
                        <option value="Drama">Drama</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Horror">Horror</option>
                        <option value="Musical">Musical</option>
                        <option value="Romance">Romance</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Other">Other</option>
                    </select>
                    <p>{showGenere()}</p>
                </div>
                <label>Year:</label>
                <input 
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    required
                />
                <label>Duration:</label>
                <input 
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    required
                />
                <label>Rate:</label>
                <input 
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                />
                <button className="update-btn" type="submit">Update Movie</button>  
                <button className="back-btn" type="button" onClick={handleBack}>Back</button>             
            </form>
        </div>
        </div>
        </div>
        </div>
    )
}

export default EditMovie;