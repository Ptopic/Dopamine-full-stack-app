import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Animated,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/core';

// Firebase
import { firebaseConfig } from '../firebase';
import { initializeApp } from '@firebase/app';
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	updateProfile,
	getAuth,
} from 'firebase/auth';

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

// Components
import Header from '@Components/Header';
import Button from '@Components/Button';

// Redux states

import { useSelector, useDispatch } from 'react-redux';
import { reset, setCredentials } from '@Redux/slices/credentialsReducer';
import { selectCredentials } from '@Redux/slices/credentialsReducer';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);

	const credentialsObj = {
		userId: '',
		email: '',
	};

	const credentials = useSelector(selectCredentials);
	const dispatch = useDispatch();

	// const handleSignUp = () => {
	// 	createUserWithEmailAndPassword(auth, email, password)
	// 		.then((userCredentials) => {
	// 			const user = userCredentials;
	// 			console.log('Registered with:', user);
	// 		})
	// 		.catch((error) => {
	// 			switch (error.code) {
	// 				case 'auth/invalid-email':
	// 					alert('Email already in use !');
	// 					break;
	// 			}
	// 		});
	// };

	const handleSignUp = () => {
		// Check if all form data is entered then try to sign up and redirect
		// console.log(email);
		// console.log(password);
		// console.log(confirmPassword);

		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				const user = userCredentials;
				console.log('Registered with:', user.uid);

				credentialsObj.userId = user.uid;
				credentialsObj.email = user.email;
				dispatch(setCredentials(credentialsObj));
			})
			.catch((error) => {
				console.log(error);
				switch (error.code) {
					case 'auth/invalid-email':
						alert('Email already in use !');
						break;
				}
			});

		// // Check if email is in right format
		// if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		// 	// If password is not same enter same password
		// 	if (password != confirmPassword) {
		// 		alert(
		// 			'Please make sure that password and confirm password are matching.'
		// 		);
		// 	} else {
		// 		if (email && password && confirmPassword) {
		// 			// Go to email confirmation screen instead of registration completion screen
		// 			navigation.replace('EmailConfirmationScreen');
		// 		} else {
		// 			alert('Please enter all requested data');
		// 		}
		// 	}
		// } else {
		// 	alert('Please enter email in right format');
		// }
	};

	const navigation = useNavigation();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header route={'Login'} color={'#0782F9'} />
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Animated.Text
						style={{
							fontSize: 25,
							fontWeight: 'bold',
							marginBottom: 10,
						}}
					>
						Register
					</Animated.Text>
				</View>

				{/* Email input field */}
				<Animated.View style={[styles.inputView]}>
					<MaterialIcons
						name="alternate-email"
						size={20}
						color="#666"
						style={{ marginRight: 5 }}
					/>
					<TextInput
						value={email}
						onChangeText={(text) => setEmail(text)}
						placeholder={'E-mail'}
						keyboardType={'email-address'}
						style={{ flex: 1, paddingVertical: 0 }}
					/>
				</Animated.View>

				{/* Password input field */}
				<Animated.View style={[styles.inputView]}>
					<Feather
						name="lock"
						size={20}
						color="#666"
						style={{ marginRight: 5 }}
					/>
					<TextInput
						value={password}
						onChangeText={(text) => setPassword(text)}
						placeholder={'Password'}
						secureTextEntry={true}
						style={{ flex: 1, paddingVertical: 0 }}
					/>
				</Animated.View>

				{/* Confirm password input field */}
				<Animated.View style={[styles.inputView]}>
					<Feather
						name="lock"
						size={20}
						color="#666"
						style={{ marginRight: 5 }}
					/>
					<TextInput
						value={confirmPassword}
						onChangeText={(text) => setConfirmPassword(text)}
						placeholder={'Confirm password'}
						secureTextEntry={true}
						style={{ flex: 1, paddingVertical: 0 }}
					/>
				</Animated.View>

				<View style={styles.buttonContainer}>
					<Button
						label="Next"
						colorBg="#0782F9"
						colorText="white"
						align="center"
						submitAction={handleSignUp}
						fontWeight="bold"
						fontSize={16}
					></Button>
				</View>
			</View>

			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
				}}
			>
				<Text style={{ fontSize: 10, color: '#666', alignSelf: 'center' }}>
					Already have an account?
				</Text>
				<TouchableOpacity onPress={() => navigation.navigate('Login')}>
					<Text style={{ color: '#0782F9', fontWeight: '700', fontSize: 14 }}>
						{' '}
						Login
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default SignUp;

const styles = StyleSheet.create({
	container: { paddingHorizontal: 25, flex: 1 },

	headerContainer: {
		alignItems: 'flex-start',
		paddingTop: 20,
		paddingBottom: 20,
	},

	inputView: {
		flexDirection: 'row',
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		paddingBottom: 8,
		marginBottom: 25,
	},
});
