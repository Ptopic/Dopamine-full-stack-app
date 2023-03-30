import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Animated,
	TouchableOpacity,
	TextInput,
	Image,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/core';

// Firebase
import { auth } from '../firebase';
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	updateProfile,
} from 'firebase/auth';

// Assets
import emailImage from '@Assets/images/confirmation.jpg';

// Components
import Header from '@Components/Header';

// Redux states

import { useSelector, useDispatch } from 'react-redux';
import { reset, setCredentials } from '@Redux/slices/credentialsReducer';
import { selectCredentials } from '@Redux/slices/credentialsReducer';

const EmailConfirmationScreen = () => {
	const credentials = useSelector(selectCredentials);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header route={'SignUp'} color={'#0782F9'} />
			<View style={{ flex: 8 }}>
				<Image
					style={{
						height: '100%',
						resizeMode: 'cover',
						width: '100%',
					}}
					source={emailImage}
				></Image>
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
					}}
				>
					Confirm your email address
				</Text>

				<Text style={{ textAlign: 'center', fontSize: 14 }}>
					We sent a confirmation email to:
				</Text>
				<Text style={{ fontWeight: 'bold', paddingVertical: 20 }}>
					{credentials.email}
				</Text>

				<Text style={{ textAlign: 'center', fontSize: 14 }}>
					Check your email and click on the confirmation link to continue.
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
				<TouchableOpacity>
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
});
