import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFail } from './moviesSlice';

function* fetchMoviesSaga(action) {
    const { category, url } = action.payload;
    try {
        console.log("Action caught by saga:", action); // Log the action
        console.log("Fetching movies from:", url); // Log the API URL
        const response = yield call(axios.get, url); // Make the API call
        console.log("API Response:", response.data); // Log the API response
        yield put(fetchMoviesSuccess({ category, data: response.data.results }));
    } catch (error) {
        console.error("API Fetch Error:", error.message); // Log any errors
        yield put(fetchMoviesFail(error.message));
    }
}

export function* watchMoviesSaga() {
    yield takeLatest(fetchMoviesStart.type, fetchMoviesSaga);
}
// In this file, we've defined a Saga function fetchMoviesSaga that takes an action containing the category and URL of the movies to fetch. Inside this Saga, we make an API call using the axios library and dispatch the appropriate actions based on the success or failure of the API call.