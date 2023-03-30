import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userId: 'dwadw',
	email: 'dwadw',
};

export const credentialsReducer = createSlice({
	name: 'credentials',
	initialState,
	reducers: {
		reset: (state) => {
			// Keep user id
			state.userId = '';
			state.email = '';
		},
		setCredentials: (state, action) => {
			state.userId = action.payload.id;
			state.email = action.payload.email;
		},
	},
});

// Action creators are generated for each case reducer function
export const { reset, setCredentials } = credentialsReducer.actions;

export const selectCredentials = (state) => state.credentials;

export default credentialsReducer.reducer;
