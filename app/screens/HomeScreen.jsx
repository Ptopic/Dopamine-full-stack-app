import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

// Redux states

import { useSelector, useDispatch } from 'react-redux';
import { reset, setCredentials } from '@Redux/slices/credentialsReducer';
import { selectCredentials } from '@Redux/slices/credentialsReducer';

// Colors
import { colors } from '../constants/colors';
const { primary, white, background400, gray500, gray400 } = colors;

const HomeScreen = () => {
	const navigation = useNavigation();

	const credentials = useSelector(selectCredentials);
	const dispatch = useDispatch();

	// const handleSignOut = () => {
	// 	const app = initializeApp(firebaseConfig);
	// 	const auth = getAuth(app);
	// 	signOut(auth);
	// };

	useEffect(() => {
		console.log('navigated');
		// console.log(credentials.userId);
	}, []);

	const handleSignOut = () => {
		navigation.replace('Login');
		// const app = initializeApp(firebaseConfig);
		// const auth = getAuth(app);
		// auth.signOut().then(() => {
		// 	navigation.replace('Login');
		// });
	};

	return (
		<KeyboardAvoidingView style={styles.container}>
			{/* <Text>Email: {auth.currentUser?.email}</Text> */}
			<TouchableOpacity onPress={handleSignOut} style={styles.button}>
				<Text style={styles.buttonText}>Sign out</Text>
			</TouchableOpacity>
			{/* <Text>{credentials.userId}</Text> */}
		</KeyboardAvoidingView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		backgroundColor: primary,
		width: '60%',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
		marginTop: 40,
	},
	buttonText: {
		color: white,
		fontWeight: '700',
		fontSize: 16,
	},
});
