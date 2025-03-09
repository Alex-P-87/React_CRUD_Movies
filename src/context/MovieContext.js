import { createContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/movies");
        
        const formattedMovies = response.data.map(movie => ({
          ...movie,
          id: String(movie.id)  
        }));
        setMovies(formattedMovies);
      } catch (error) {
        console.error("There was an error fetching the movies!", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
