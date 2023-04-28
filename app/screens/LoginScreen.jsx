import { useNavigation } from '@react-navigation/core';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
	Animated,
	KeyboardAvoidingView,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

import { updateNotification } from '../utils/helper';
import { signin } from '../utils/auth';
import { Formik } from 'formik';
import * as yup from 'yup';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

// Components
import InputField from '@Components/InputField';
import Button from '@Components/Button';
import Header from '@Components/Header';
import Notification from '../components/Notification';

// Redux states

import { useSelector, useDispatch } from 'react-redux';
import { reset, setCredentials } from '@Redux/slices/credentialsReducer';
import { selectCredentials } from '@Redux/slices/credentialsReducer';

const LoginScreen = () => {
	const [message, setMessage] = useState({
		text: '',
		type: '',
	});
	// const credentialsObj = {
	// 	userId: '',
	// 	email: '',
	// };
	// const credentials = useSelector(selectCredentials);
	// const dispatch = useDispatch();

	const navigation = useNavigation();

	const initialValues = {
		email: '',
		password: '',
	};

	const validationSchema = yup.object({
		email: yup.string().email('Invalid email').required('Email is missing'),
		password: yup
			.string()
			.trim()
			.min(8, 'Password is too short')
			.required('Password is missing'),
	});

	const handleLogIn = async (values, formikActions) => {
		const res = await signin(values);
		formikActions.setSubmitting(false);

		if (!res.success) return updateNotification(setMessage, res.error);

		navigation.navigate('Home');
		formikActions.resetForm();
		console.log(res);
	};

	// const user = userCredentials.user;

	// credentialsObj.userId = user.uid;
	// credentialsObj.email = user.email;
	// dispatch(setCredentials(credentialsObj));

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header route={'Starter'} color={'#1769fd'} />
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				{message.text && (
					<Notification type={message.type} text={message.text} />
				)}
				<View style={styles.headerContainer}>
					<Text
						style={{
							fontSize: 25,
							fontWeight: 'bold',
							marginBottom: 10,
							color: '#fff',
						}}
					>
						Welcome back
					</Text>

					<Text
						style={{
							marginBottom: 10,
							color: '#fff',
						}}
					>
						Please enter your details.
					</Text>
				</View>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleLogIn}
				>
					{() => {
						return (
							<>
								{/* Email input field */}
								<InputField
									icon={
										<MaterialIcons
											name="alternate-email"
											size={20}
											color="#a9aec6"
											style={{ marginRight: 5 }}
										/>
									}
									name={'email'}
									placeholder={'E-mail'}
									keyboardType={'email-address'}
								></InputField>

								{/* Password input field */}
								<InputField
									icon={
										<Feather
											name="lock"
											size={20}
											color="#a9aec6"
											style={{ marginRight: 5 }}
										/>
									}
									name={'password'}
									placeholder={'Password'}
									inputType={'password'}
								></InputField>

								<TouchableOpacity
									style={{ alignSelf: 'flex-start' }}
									onPress={() => navigation.replace('Forgot')}
								>
									<Text
										style={{
											fontSize: 12,
											color: '#1769fd',
											textAlign: 'left',
											fontWeight: 'bold',
										}}
									>
										Forgot password?
									</Text>
								</TouchableOpacity>

								<View style={styles.buttonContainer}>
									<Button
										label="Login"
										colorBg="#1769fd"
										colorText="white"
										align="center"
										fontWeight="bold"
										fontSize={16}
									></Button>
								</View>
							</>
						);
					}}
				</Formik>
			</KeyboardAvoidingView>
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
					<Text style={{ color: '#1769fd', fontWeight: '700', fontSize: 14 }}>
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
	container: { paddingHorizontal: 20, flex: 1 },
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
