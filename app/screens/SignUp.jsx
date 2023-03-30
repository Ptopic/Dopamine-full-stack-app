import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Animated,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
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
	const [emailVal, setEmailVal] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);

	const credentialsObj = {
		userId: '',
		email: '',
	};

	const { userId, email } = useSelector((state) => state.credentials);
	const dispatch = useDispatch();

	const handleSignUp = async () => {
		// Check if all form data is entered then try to sign up and redirect

		// Check if email is in right format
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailVal)) {
			// If password is not same enter same password
			if (password != confirmPassword) {
				alert(
					'Please make sure that password and confirm password are matching.'
				);
			} else {
				if (email && password && confirmPassword) {
					// Go to email confirmation screen instead of registration completion screen
					const cred = await createUserWithEmailAndPassword(
						auth,
						emailVal,
						password
					)
						.then((userCredentials) => {
							const user = userCredentials.user;
							console.log('Registered with:', user.uid);

							// credentialsObj.userId = user.uid;
							// credentialsObj.email = user.email;

							// console.log(credentialsObj);
							dispatch(setCredentials({ id: user.uid, email: emailVal }));
							navigation.navigate('EmailConfirmationScreen');
						})
						.catch((error) => {
							console.log(error);
							switch (error.code) {
								case 'auth/invalid-email':
									alert('Email already in use !');
									break;
							}
						});
					await sendEmailVerification(cred.user);
				} else {
					alert('Please enter all requested data');
				}
			}
		} else {
			alert('Please enter email in right format');
		}

		// dispatch(setCredentials({ id: '1212', email: 'dadwadwa' }));
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
						value={emailVal}
						onChangeText={(text) => setEmailVal(text)}
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

					<Text>{userId}</Text>

					<Text>{email}</Text>
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
