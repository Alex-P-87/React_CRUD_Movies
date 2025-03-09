import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { MovieContext } from "../context/MovieContext";
import './styleComponents/AddNewMovie.css';

const AddNewMovie = () => {
    const { movies, setMovies } = useContext(MovieContext);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: '',
            director: '',
            genre: [],
            year: 2000,
            duration: 100,
            rate: 7
        },
        onSubmit: async (values) => {
            const newId = movies.length > 0 ? String(Math.max(...movies.map(movie => Number(movie.id))) + 1) : "1";
            const newMovie = { id: newId, ...values, year: parseInt(values.year) };

            try {
                await axios.post('http://localhost:5000/movies', newMovie);
                setMovies([...movies, newMovie]);
                navigate('/successfully', {
                    state: {
                        text1: "movie added successfully",
                        text2: "back",
                        text3: "add new movie"
                    }
                });
            } catch (error) {
                console.error("There was an error adding the movie!", error);
            }
        }
    });

    const handleGenreChange = (e) => {
        const selectedGenre = e.target.value;
        if (formik.values.genre.includes(selectedGenre)) {
            formik.setFieldValue('genre', formik.values.genre.filter(g => g !== selectedGenre));
        } else if (formik.values.genre.length < 3) {
            formik.setFieldValue('genre', [...formik.values.genre, selectedGenre]);
        }
    };

    const showGenere = () => {
        const remaining = 3 - formik.values.genre.length;
        return `You can add ${remaining} more genre(s)`;
    };

    

    return (
        <div>
            <h1>Add New Movie</h1>
            <div className="container">
                <div className="add-movie-card">
                    <div className="add-movie-form">
                        <form onSubmit={formik.handleSubmit}>
                            <label>Title:</label>
                            <input 
                                type="text"
                                name="title"
                                value={formik.values.title}
                                placeholder="Field must be entered"
                                onChange={formik.handleChange}
                                required
                            />
                            <label>Director:</label>
                            <input 
                                type="text"
                                name="director"
                                value={formik.values.director}
                                onChange={formik.handleChange}
                            />
                            <label>Genre:</label>
                            <div>
                                <select 
                                    multiple 
                                    value={formik.values.genre} 
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
                                    <option value="Thriller">Thriller</option>
                                    <option value="Other">Other</option>
                                </select>
                                 <p>{showGenere()}</p>
                            </div>
                            <label>Year:</label>
                            <input 
                                type="number"
                                name="year"
                                value={formik.values.year}
                                placeholder="Field must be entered"
                                onChange={formik.handleChange}
                                required
                            />
                            <label>Duration:</label>
                            <input 
                                type="number"
                                name="duration"
                                value={formik.values.duration}
                                placeholder="Field must be entered"
                                onChange={formik.handleChange}
                                required
                            />
                            <label>Rate:</label>
                            <input 
                                type="number"
                                name="rate"
                                value={formik.values.rate}
                                onChange={formik.handleChange}
                            />
                            <button  type="submit">Add Movie</button>               
                        </form>
                    </div>
                </div>
            </div>
            <button onClick={() => navigate('/')}>Back</button>
        </div>
    )
}

export default AddNewMovie;