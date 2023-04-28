import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	KeyboardAvoidingView,
	Animated,
	TouchableOpacity,
	TextInput,
	Image,
	Easing,
	Dimensions,
	Keyboard,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigation, useLocation } from '@react-navigation/core';

import Lottie from 'lottie-react-native';

// Assets

import { updateNotification } from '../utils/helper';
import { verifyEmail } from '../utils/auth';

// Components
import Header from '@Components/Header';
import Notification from '@Components/Notification';

// Redux states

import { useSelector, useDispatch } from 'react-redux';
import { reset, setCredentials } from '@Redux/slices/credentialsReducer';
import { selectCredentials } from '@Redux/slices/credentialsReducer';

let newInputIndex = 0;

const inputs = Array(4).fill('');

const isObjValid = (obj) => {
	return Object.values(obj).every((val) => val.trim());
};

const EmailConfirmationScreen = (props) => {
	const navigation = useNavigation();
	const userId = props.route.params.userId;
	const inputRef = useRef();
	const [message, setMessage] = useState({
		text: '',
		type: '',
	});
	const [OTP, setOTP] = useState({ 0: '', 1: '', 2: '', 3: '' });
	const [nextInputIndex, setNextInputIndex] = useState(0);
	const credentials = useSelector(selectCredentials);

	const animationProgress = useRef(new Animated.Value(0));

	useEffect(() => {
		console.log(userId);
		Animated.timing(animationProgress.current, {
			toValue: 1,
			duration: 5000,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	}, []);

	const resetInput = () => {
		setOTP({ 0: '', 1: '', 2: '', 3: '' });
	};

	const resendEmail = () => {
		console.log('Email sent!');
	};

	const handleChangeText = (text, index) => {
		const newOTP = { ...OTP };
		newOTP[index] = text;
		setOTP(newOTP);

		newInputIndex =
			index === inputs.length - 1 ? inputs.length - 1 : (index += 1);

		console.log(index + '---' + inputs.length);

		setNextInputIndex(newInputIndex);
	};

	const submitOTP = async () => {
		Keyboard.dismiss();

		// console.log(inputs);
		resetInput();

		// console.log(isObjValid(OTP));
		if (isObjValid(OTP)) {
			let val = '';

			Object.values(OTP).forEach((v) => {
				val += v;
			});

			const res = await verifyEmail(val, userId);

			if (!res.success) return updateNotification(setMessage, res.error);

			// console.log(res);
			navigation.navigate('AnalyzingData');
		}
	};

	useEffect(() => {
		inputRef.current.focus;
	}, [nextInputIndex]);

	useEffect(() => {
		if (isObjValid(OTP)) {
			submitOTP();
		}
	}, [OTP]);

	console.log(OTP);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{/* <Header route={'SignUp'} color={'#0782F9'} /> */}
			<View style={{ flex: 5 }}>
				{message.text && (
					<Notification type={message.type} text={message.text} />
				)}
				<Lottie
					source={require('../assets/images/confirmEmail.json')}
					progress={animationProgress.current}
					loop
				/>
			</View>

			<View
				style={{
					flex: 7,
					alignItems: 'center',
					paddingVertical: 25,
					paddingHorizontal: 25,
				}}
			>
				<Text
					style={{
						fontWeight: 'bold',
						fontSize: 20,
						textAlign: 'center',
						paddingBottom: 30,
						color: 'white',
					}}
				>
					Confirm your email address
				</Text>

				<View style={styles.inputView}>
					{inputs.map((input, index) => {
						return (
							<View key={index.toString()} style={styles.inputContainer}>
								<TextInput
									onChangeText={(text) => handleChangeText(text, index)}
									keyboardAppearance="dark"
									keyboardType="numeric"
									value={OTP[index]}
									style={styles.input}
									maxLength={1}
									ref={nextInputIndex === index ? inputRef : null}
									// keyboardType="number-pad"
								/>
							</View>
						);
					})}
				</View>

				<Text style={{ textAlign: 'center', fontSize: 14, color: 'white' }}>
					We sent a confirmation email to:
				</Text>
				<Text
					style={{ fontWeight: 'bold', paddingVertical: 20, color: 'white' }}
				>
					{credentials.email}
				</Text>

				<Text style={{ textAlign: 'center', fontSize: 14, color: 'white' }}>
					Check your email and enter 6 digit code to continue.
				</Text>
			</View>

			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<TouchableOpacity onPress={resendEmail}>
					<Text style={{ color: '#0782F9', fontWeight: '700', fontSize: 14 }}>
						Resend email
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default EmailConfirmationScreen;

const { width } = Dimensions.get('window');

const inputWidth = Math.round(width / 6);

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'green',
	},
	headerContainer: {
		alignItems: 'flex-start',
		paddingTop: 20,
		paddingBottom: 20,
		width: '40%',
		height: '40%',
	},
	inputView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 40,
		// paddingHorizontal: 15,
		// paddingVertical: 22,
		// borderRadius: 16,
	},
	inputContainer: {
		color: 'white',
		// justifyContent: 'center',
		// alignItems: 'center',
		// borderColor: 'red',
		// borderWidth: 2,
	},

	input: {
		width: inputWidth,
		height: inputWidth * 1.2,
		backgroundColor: '#353945',
		padding: 20,
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		color: 'white',
	},
});
