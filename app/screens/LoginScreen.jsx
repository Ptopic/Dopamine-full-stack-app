import { useNavigation } from '@react-navigation/core';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
	Animated,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase';
import { initializeApp } from '@firebase/app';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

// Components
import InputField from '@Components/InputField';
import Button from '@Components/Button';
import Header from '@Components/Header';

// Redux states

import { useSelector, useDispatch } from 'react-redux';
import { reset, setCredentials } from '@Redux/slices/credentialsReducer';
import { selectCredentials } from '@Redux/slices/credentialsReducer';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const credentials = useSelector(selectCredentials);
	const dispatch = useDispatch();

	const navigation = useNavigation();

	const shakeEmail = useRef(new Animated.Value(0)).current;
	const shakePassword = useRef(new Animated.Value(0)).current;

	const shakeAnimEmail = () => {
		// Will change fadeAnim value to 1 in 5 seconds
		Animated.sequence([
			Animated.timing(shakeEmail, {
				toValue: 10,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(shakeEmail, {
				toValue: -10,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(shakeEmail, {
				toValue: 10,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(shakeEmail, {
				toValue: 0,
				duration: 100,
				useNativeDriver: true,
			}),
		]).start();
	};

	const shakeAnimPassword = () => {
		// Will change fadeAnim value to 1 in 5 seconds
		Animated.sequence([
			Animated.timing(shakePassword, {
				toValue: 10,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(shakePassword, {
				toValue: -10,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(shakePassword, {
				toValue: 10,
				duration: 100,
				useNativeDriver: true,
			}),
		]).start();
	};

	// If user is logedin switch to home page
	useEffect(() => {
		const unsub = auth.onAuthStateChanged((user) => {
			if (user) {
				navigation.replace('Home');
			}
		});
		return unsub;
	}, []);

	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);

	const handleLogIn = () => {
		console.log(credentials);
		// dispatch(reset());

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				const user = userCredentials.user;
				console.log('Logged in with', user.uid);

				dispatch(setCredentials(user.uid));
				console.log(credentials);

				// Delete user email and password from state keep only user id
			})
			.catch((error) => {
				console.log(error.code);
				switch (error.code) {
					case 'auth/invalid-email':
						shakeAnimEmail();
						alert('Invalid email!');
						break;
					case 'auth/internal-error':
						// Add shake effect for form and color it red for 1 second
						shakeAnimPassword();
						alert('Please enter a password!');
						break;
					case 'auth/too-many-requests':
						alert('Too many requests, slow down');
						break;
					case 'auth/wrong-password':
						// Add shake effect for form and color it red for 1 second
						shakeAnimPassword();
						alert('Wrong password');
						break;
					case 'auth/user-not-found':
						// Add shake effect for form and color it red for 1 second
						shakeAnimEmail();
						shakeAnimPassword();
						alert('Invalid email or password');
						break;
				}
			});
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header route={'Starter'} color={'#0782F9'} />
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Animated.Text
						style={{
							fontSize: 25,
							fontWeight: 'bold',
							marginBottom: 10,
						}}
					>
						Welcome back
					</Animated.Text>

					<Text>Please enter your details.</Text>
				</View>
				<Animated.View
					style={[
						styles.inputView,
						{
							transform: [{ translateX: shakeEmail }],
						},
					]}
				>
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

				<Animated.View
					style={[
						styles.inputView,
						{
							transform: [{ translateX: shakePassword }],
						},
					]}
				>
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
						style={{ flex: 1, paddingVertical: 0 }}
						secureTextEntry={true}
					/>
				</Animated.View>

				<TouchableOpacity
					style={{ alignSelf: 'flex-start' }}
					onPress={() => navigation.replace('Forgot')}
				>
					<Text style={{ fontSize: 12, color: '#666', textAlign: 'left' }}>
						Forgot password?
					</Text>
				</TouchableOpacity>

				<View style={styles.buttonContainer}>
					<Button
						label="Login"
						colorBg="#0782F9"
						colorText="white"
						align="center"
						submitAction={handleLogIn}
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
					New to the app?
				</Text>
				<TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
					<Text style={{ color: '#0782F9', fontWeight: '700', fontSize: 14 }}>
						{' '}
						Register
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default LoginScreen;

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
	input: {
		backgroundColor: 'white',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginTop: 5,
	},
	buttonContainer: {
		marginTop: 40,
	},
	button: {
		backgroundColor: '#0782F9',
		width: '100%',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
	},
	buttonOutline: {
		backgroundColor: 'white',
		marginTop: 5,
		borderColor: '#0782F9',
		borderWidth: 2,
	},
	buttonText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 16,
	},
	buttonOutlineText: {
		color: '#0782F9',
		fontWeight: '700',
		fontSize: 16,
	},
});
