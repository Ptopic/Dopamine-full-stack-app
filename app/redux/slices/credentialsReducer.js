import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userId: '',
};

export const credentialsReducer = createSlice({
	name: 'credentials',
	initialState,
	reducers: {
		reset: (state) => {
			// Keep user id
			state.userId = '';
		},
		setCredentials: (state, action) => {
			const newId = action.payload;
			state.userId = newId;
		},
	},
});

// Action creators are generated for each case reducer function
export const { reset, setCredentials } = credentialsReducer.actions;

export const selectCredentials = (state) => state.credentials;

export default credentialsReducer.reducer;
