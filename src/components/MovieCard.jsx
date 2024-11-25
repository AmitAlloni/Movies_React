import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MovieCard.css'; // Add a CSS file for styling

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <Link to={`/movie/${movie.id}`}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-card-poster"
                />
            </Link>
        </div>
    );
};

export default MovieCard;
// In this example, we have a MovieCard component that displays a movie poster. The component receives a movie prop, which contains the movie data. We use the Link component from react-router-dom to create a link to the movie details page for the specific movie.