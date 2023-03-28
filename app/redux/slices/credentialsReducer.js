import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userId: '',
	email: '',
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
			const { newId, email } = action.payload;
			state.userId = newId;
			state.email = email;
		},
	},
});

// Action creators are generated for each case reducer function
export const { reset, setCredentials } = credentialsReducer.actions;

export const selectCredentials = (state) => state.credentials;

export default credentialsReducer.reducer;
