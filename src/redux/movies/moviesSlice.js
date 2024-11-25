import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        popular: [],
        playingNow: [],
        favorites: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchMoviesStart(state) {
            state.loading = true;
        },
        fetchMoviesSuccess(state, action) {
            console.log("Updating state with movies:", action.payload.data);
            state.loading = false;
            state[action.payload.category] = action.payload.data;
        },
        fetchMoviesFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        toggleFavorite(state, action) {
            const movie = action.payload;
            const exists = state.favorites.find((fav) => fav.id === movie.id);
            if (exists) {
                state.favorites = state.favorites.filter((fav) => fav.id !== movie.id);
            } else {
                state.favorites.push(movie);
            }
        },
    },
});

export const {
    fetchMoviesStart,
    fetchMoviesSuccess,
    fetchMoviesFail,
    toggleFavorite,
} = moviesSlice.actions;

export default moviesSlice.reducer;
