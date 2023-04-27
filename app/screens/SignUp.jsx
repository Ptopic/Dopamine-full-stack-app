import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Animated,
	TouchableOpacity,
	TextInput,
	Keyboard,
	KeyboardAvoidingView,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';

import { Formik } from 'formik';
import * as yup from 'yup';

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Components
import InputField from '../components/InputField';
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

	const [long, longEnough] = useState(false);
	const [number, hasNumber] = useState(false);
	const [upper, hasUpper] = useState(false);
	const [noSpaces, hasNoSpaces] = useState(false);

	const [passwordError, setPasswordError] = useState('');

	// const app = initializeApp(firebaseConfig);
	// const auth = getAuth(app);

	// const credentialsObj = {
	// 	userId: '',
	// 	email: '',
	// };

	// const { userId, email } = useSelector((state) => state.credentials);
	// const dispatch = useDispatch();

	// dispatch(setCredentials({ id: user.uid, email: emailVal }));

	const navigation = useNavigation();

	const initialValues = {
		email: '',
		password: '',
	};

	const validationSchema = yup.object({
		email: yup.string().email('Invalid email').required('Email is missing'),
	});

	const handleSignUp = (values, formikActions) => {
		setTimeout(() => {
			if (!long || !number || !upper || !noSpaces) {
				setPasswordError("Your password doesn't meet the requirements");
			} else {
				setPasswordError('');
				longEnough(false);
				hasNumber(false);
				hasUpper(false);
				console.log(values, formikActions);
				formikActions.resetForm();
				navigation.navigate('EmailConfirmationScreen');
			}
			formikActions.setSubmitting(false);
		}, 1000);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header route={'Login'} color={'#1769fd'} />
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.headerContainer}>
					<Animated.Text
						style={{
							fontSize: 25,
							color: 'white',
							fontWeight: 'bold',
							marginBottom: 10,
						}}
					>
						Register
					</Animated.Text>
				</View>

				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					validate={(values) => {
						setPasswordError('');
						values.password.length < 8 ? longEnough(false) : longEnough(true);
						!/\d/.test(values.password) ? hasNumber(false) : hasNumber(true);
						/\s/.test(values.password) ? hasNoSpaces(false) : hasNoSpaces(true);
						/[A-Z]/.test(values.password) ? hasUpper(true) : hasUpper(false);
					}}
					onSubmit={handleSignUp}
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

								{/* Display password error */}
								{passwordError ? (
									<View>
										<Text style={{ color: '#f44336', marginBottom: 10 }}>
											Sorry! {passwordError}
										</Text>
									</View>
								) : null}

								<View style={{ paddingBottom: 40, paddingTop: 10 }}>
									<View style={{ paddingBottom: 20 }}>
										<Text style={{ color: 'white', fontWeight: 'bold' }}>
											Password must have:
										</Text>
									</View>
									<View
										style={{
											flexDirection: 'row',
											paddingBottom: 15,
											alignItems: 'center',
										}}
									>
										{long ? (
											<AntDesign
												name="checkcircle"
												size={25}
												color="#1769fd"
												style={{ marginRight: 10 }}
											/>
										) : (
											<AntDesign
												name="checkcircleo"
												size={25}
												color="#a9aec6"
												style={{ marginRight: 10 }}
											/>
										)}

										<Text style={{ color: long ? 'white' : '#a9aec6' }}>
											At leats 8 characters
										</Text>
									</View>

									<View
										style={{
											flexDirection: 'row',
											paddingBottom: 15,
											alignItems: 'center',
										}}
									>
										{number ? (
											<AntDesign
												name="checkcircle"
												size={25}
												color="#1769fd"
												style={{ marginRight: 10 }}
											/>
										) : (
											<AntDesign
												name="checkcircleo"
												size={25}
												color="#a9aec6"
												style={{ marginRight: 10 }}
											/>
										)}
										<Text style={{ color: number ? 'white' : '#a9aec6' }}>
											At leats one number
										</Text>
									</View>

									<View
										style={{
											flexDirection: 'row',
											paddingBottom: 15,
											alignItems: 'center',
										}}
									>
										{upper ? (
											<AntDesign
												name="checkcircle"
												size={25}
												color="#1769fd"
												style={{ marginRight: 10 }}
											/>
										) : (
											<AntDesign
												name="checkcircleo"
												size={25}
												color="#a9aec6"
												style={{ marginRight: 10 }}
											/>
										)}
										<Text style={{ color: upper ? 'white' : '#a9aec6' }}>
											At leats one uppercase letter
										</Text>
									</View>

									<View
										style={{
											flexDirection: 'row',
											paddingBottom: 15,
											alignItems: 'center',
										}}
									>
										{noSpaces ? (
											<AntDesign
												name="checkcircle"
												size={25}
												color="#1769fd"
												style={{ marginRight: 10 }}
											/>
										) : (
											<AntDesign
												name="checkcircleo"
												size={25}
												color="#a9aec6"
												style={{ marginRight: 10 }}
											/>
										)}
										<Text style={{ color: noSpaces ? 'white' : '#a9aec6' }}>
											No spaces
										</Text>
									</View>
								</View>

								<View style={styles.buttonContainer}>
									<Button
										label="Next"
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
});
