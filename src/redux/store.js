import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import moviesReducer from './movies/moviesSlice';
import { watchMoviesSaga } from './movies/moviesSage';

// Create Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
const store = configureStore({
    reducer: {
        movies: moviesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the saga
sagaMiddleware.run(watchMoviesSaga);

export default store;
// In this file, we've created a store using the configureStore function from Redux Toolkit. We've also created a Saga middleware using the createSagaMiddleware function from Redux Saga.