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
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';

import Lottie from 'lottie-react-native';

// Assets

// Components
import Header from '@Components/Header';

// Redux states

import { useSelector, useDispatch } from 'react-redux';
import { reset, setCredentials } from '@Redux/slices/credentialsReducer';
import { selectCredentials } from '@Redux/slices/credentialsReducer';

const EmailConfirmationScreen = () => {
	const credentials = useSelector(selectCredentials);

	const animationProgress = useRef(new Animated.Value(0));

	useEffect(() => {
		Animated.timing(animationProgress.current, {
			toValue: 1,
			duration: 5000,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	}, []);

	const resendEmail = () => {
		console.log('Email sent!');
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header route={'SignUp'} color={'#0782F9'} />
			<View style={{ flex: 5 }}>
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
					<TextInput
						placeholder={'6 digit otp code'}
						placeholderTextColor={'#acb3bc'}
						style={styles.regularInput}
					/>
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
		backgroundColor: '#353945',
		paddingHorizontal: 15,
		paddingVertical: 22,
		borderRadius: 16,
		marginBottom: 40,
	},
	regularInput: { flex: 1, paddingVertical: 0, color: 'white' },
});
