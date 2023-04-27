import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Animated,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';

import { Formik } from 'formik';
import * as yup from 'yup';

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

// Components
import InputField from '@Components/InputField';
import Button from '@Components/Button';
import Header from '@Components/Header';

const ForgotPassword = () => {
	const navigation = useNavigation();

	const initialValues = {
		email: '',
	};

	const validationSchema = yup.object({
		email: yup.string().email('Invalid email').required('Email is missing'),
	});

	const handlePasswordReset = (values, formikActions) => {
		setTimeout(() => {
			console.log(values, formikActions);
			navigation.navigate('Login');
			formikActions.resetForm();
			formikActions.setSubmitting(false);
		}, 1000);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header route={'Login'} color={'#1769fd'} />

			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Animated.Text
						style={{
							fontSize: 25,
							fontWeight: 'bold',
							marginBottom: 20,
							color: 'white',
						}}
					>
						Forgot password?
					</Animated.Text>

					<Text
						style={{
							fontSize: 14,
							color: '#666',
							color: '#a9aec6',
							marginBottom: 20,
						}}
					>
						Enter the email associated with your account and we'll send an email
						with instructions to reset your password.
					</Text>
				</View>

				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handlePasswordReset}
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

								<View style={styles.buttonContainer}>
									<Button
										label="Reset password"
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
			</View>
		</SafeAreaView>
	);
};

export default ForgotPassword;

const styles = StyleSheet.create({
	container: { paddingHorizontal: 20, flex: 1 },
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
