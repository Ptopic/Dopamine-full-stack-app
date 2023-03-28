import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Animated,
	TextInput,
} from 'react-native';
import React, { useState } from 'react';

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Components
import Header from '@Components/Header';
import Button from '@Components/Button';

// Firebase
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { firebaseConfig } from '../firebase';
import { initializeApp } from '@firebase/app';

const ForgotPassword = () => {
	const [email, setEmail] = useState();
	const [error, setError] = useState(null);
	const [submitted, setSubmitted] = useState(false);

	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);

	const resetPassword = async () => {
		try {
			await sendPasswordResetEmail(auth, email);
			setSubmitted(true);
			setError(null);
		} catch (error) {
			console.log(error);
			if (error.code === 'auth/user-not-found') {
				setError('User not found');
			} else {
				setError('There was a problem with your request');
			}
		}
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header route={'Starter'} color={'#0782F9'} />

			{submitted ? (
				<Text>Please check your email for a reset password link.</Text>
			) : (
				<View style={styles.container}>
					<View style={styles.headerContainer}>
						<Animated.Text
							style={{
								fontSize: 25,
								fontWeight: 'bold',
								marginBottom: 20,
							}}
						>
							Forgot password?
						</Animated.Text>

						<Text
							style={{
								fontSize: 14,
								color: '#666',
							}}
						>
							Enter the email associated with your account and we'll send an
							email with instructions to reset your password.
						</Text>
					</View>

					<View style={styles.inputView}>
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
					</View>

					{error && <Text style={styles.error}>{error}</Text>}

					<View style={styles.buttonContainer}>
						<Button
							label="Reset password"
							colorBg="#0782F9"
							colorText="white"
							align="center"
							submitAction={resetPassword}
							fontWeight="bold"
							fontSize={16}
						></Button>
					</View>
				</View>
			)}
		</SafeAreaView>
	);
};

export default ForgotPassword;

const styles = StyleSheet.create({
	container: { paddingHorizontal: 25, flex: 1 },
	headerContainer: {
		alignItems: 'flex-start',
		paddingTop: 20,
		paddingBottom: 20,
	},
	buttonContainer: {
		marginTop: 30,
	},
	inputView: {
		flexDirection: 'row',
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		paddingBottom: 8,
		marginTop: 35,
	},
	error: {
		marginBottom: 20,
		color: 'red',
	},
});
