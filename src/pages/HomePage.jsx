import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesStart } from '../redux/movies/moviesSlice';
import MovieCard from '../components/MovieCard';
import '../styles/HomePage.css';

const chunkMovies = (movies = [], size) => {
    const chunks = [];
    for (let i = 0; i < movies.length; i += size) {
        chunks.push(movies.slice(i, i + size));
    }
    return chunks;
};


const HomePage = () => {
    const dispatch = useDispatch();
    const { popular, playingNow, favorites, loading } = useSelector((state) => state.movies);

    const [filter, setFilter] = useState('popular');
    const [displayedMovies, setDisplayedMovies] = useState([]);
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

    useEffect(() => {
        if (filter === 'popular') {
            const API_ENDPOINT_FOR_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`;
            dispatch(fetchMoviesStart({ category: 'popular', url: API_ENDPOINT_FOR_POPULAR }));
        } else if (filter === 'playing_now') {
            const API_ENDPOINT_FOR_PLAYING_NOW = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=1`;
            dispatch(fetchMoviesStart({ category: 'playingNow', url: API_ENDPOINT_FOR_PLAYING_NOW }));
        } else if (filter === 'favorites') {
            setDisplayedMovies(favorites);
        }
    }, [filter, dispatch, favorites]);

    useEffect(() => {
        if (!loading) {
            if (filter === 'popular') {
                setDisplayedMovies(popular || []);
            } else if (filter === 'playing_now') {
                setDisplayedMovies(playingNow || []);
            } else if (filter === 'favorites') {
                setDisplayedMovies(favorites || []);
            }
        }
    }, [filter, popular, playingNow, favorites, loading]);

    const movieChunks = displayedMovies && displayedMovies.length > 0
        ? chunkMovies(displayedMovies, 5)
        : [];

    return (
        <div className="homepage">
            {/* Header */}
            <header className="homepage-header">
                <h1 className="homepage-logo">Technical Test</h1>
            </header>

            {/* Hero Section */}
            <div className="homepage-hero">
                <h2>
                    {filter === 'popular'
                        ? 'Popular Movies'
                        : filter === 'playing_now'
                            ? 'Now Playing'
                            : 'My Favorites'}
                </h2>
                <div className="filter-buttons">
                    <button
                        className={`filter-button ${filter === 'popular' ? 'active' : ''}`}
                        onClick={() => setFilter('popular')}
                    >
                        Popular
                    </button>
                    <button
                        className={`filter-button ${filter === 'playing_now' ? 'active' : ''}`}
                        onClick={() => setFilter('playing_now')}
                    >
                        Now Playing
                    </button>
                    <button
                        className={`filter-button ${filter === 'favorites' ? 'active' : ''}`}
                        onClick={() => setFilter('favorites')}
                    >
                        My Favorites
                    </button>
                </div>
            </div>

            {/* Movie Rows */}
            <div className="homepage-movies">
                {loading ? (
                    <p>Loading...</p>
                ) : displayedMovies.length === 0 ? (
                    <p className="empty-message">
                        {filter === 'popular'
                            ? 'No popular movies found.'
                            : filter === 'playing_now'
                                ? 'No movies are playing now.'
                                : 'Your favorites list is empty.'}
                    </p>
                ) : (
                    movieChunks.map((row, rowIndex) => (
                        <div className="movies-row" key={rowIndex} data-row={rowIndex}>
                            {row.map((movie, colIndex) => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    tabIndex={0}
                                    data-col={colIndex}
                                    className="movie-card"
                                />
                            ))}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HomePage;
