import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/movies/moviesSlice';
import '../styles/MovieDetailsPage.css';

const MovieDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.movies.favorites);
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const API_ENDPOINT_FOR_DETAILS = `https://api.themoviedb.org/3/movie/${id}?api_key=7adaa73c93375a0b6ec87c74a4accc36`;
            try {
                const response = await fetch(API_ENDPOINT_FOR_DETAILS);
                const data = await response.json();
                setMovieDetails(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;

    const isFavorite = favorites.some((movie) => movie.id === movieDetails.id);

    const handleFavoriteToggle = () => {
        dispatch(toggleFavorite(movieDetails));
    };

    return (
        <div className="movie-details">
            {/* Background Image */}
            <div
                className="background"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.poster_path})`,
                }}
            />
            <div className="back-button" onClick={() => window.history.back()}>
                ← Back
            </div>

            {/* Content Section */}
            <div className="movie-content">
                {/* Poster Section */}
                <div className="movie-poster">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                        alt={movieDetails.title}
                    />
                </div>

                {/* Details Section */}
                <div className="movie-info">
                    <h1>
                        {movieDetails.title} ({movieDetails.release_date?.split('-')[0]})
                    </h1>
                    <p className="movie-genre">
                        {movieDetails.genres.map((genre) => genre.name).join(', ')} |{' '}
                        {movieDetails.runtime} minutes | {movieDetails.release_date}
                    </p>
                    <p className="movie-score">
                        <strong>User Score:</strong> {movieDetails.vote_average}
                    </p>
                    <h2>Overview</h2>
                    <em>{movieDetails.tagline}</em>
                    <p>{movieDetails.overview}</p>
                    <div className="favorite-button-container">
                        <button
                            className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
                            onClick={handleFavoriteToggle}
                            title={isFavorite ? 'Remove from Favorites' : 'Mark as Favorite'}
                        >
                            ❤️
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
