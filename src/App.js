import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieProvider from './context/MovieContext';
import MovieList from './components/MovieList';
import MovieDetails from "./components/MovieDetails";
import AddNewMovie from "./components/AddNewMovie";
import Successfully from './components/Successfully';
import EditMovie from "./components/EditMovie";
import DeleteMovie from "./components/DeleteMovie";
import DynamicBackground from './components/DynamicBackground';

function App() {
  return (
    <div className="App">
      <MovieProvider>     
        <BrowserRouter>
        <DynamicBackground /> 
          <Routes>       
            <Route path="/" element={<MovieList />} />  
            <Route path="/movies/:id/" element={<MovieDetails />} />     
            <Route path="/movies" element={<MovieList />} />
            <Route path="/new" element={<AddNewMovie />} />
            <Route path="/edit/:id" element={<EditMovie />} />
            <Route path="/delete/:id" element={<DeleteMovie />} />
            <Route path="/successfully" element={<Successfully />} />                 
          </Routes>
        </BrowserRouter>
      </MovieProvider>
    </div>
  );
}

export default App;