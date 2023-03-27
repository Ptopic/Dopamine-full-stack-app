import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import credentialsReducer from './slices/credentialsReducer';

export default configureStore({
	reducer: {
		counter: counterReducer,
		credentials: credentialsReducer,
	},
});
