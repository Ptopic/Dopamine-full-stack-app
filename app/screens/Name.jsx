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

import { Formik } from 'formik';
import * as yup from 'yup';

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

// Components
import Header from '@Components/Header';
import Button from '@Components/Button';
import InputField from '@Components/InputField';

// Colors
import { colors } from '../constants/colors';
const { primary, white, background400, gray500, gray400 } = colors;

const Name = () => {
	const [name, setName] = useState('');
	const next = () => {
		navigation.replace('DateOfBirth');
	};

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

	const handleSignUp = (values, formikActions) => {
		console.log(values, formikActions);
		console.log('test');
		formikActions.resetForm();
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header route={'PhoneNumber'} color={primary} title={'Step 3 of 6'} />
			<View style={{ paddingHorizontal: 20, flex: 1 }}>
				<View
					style={{
						alignItems: 'flex-start',
						paddingTop: 20,
						paddingBottom: 120,
					}}
				>
					<Text
						style={{
							fontSize: 25,
							fontWeight: 'bold',
							marginBottom: 20,
							color: white,
						}}
					>
						What's your name?
					</Text>

					<Text
						style={{
							fontSize: 14,
							marginBottom: 10,
							color: white,
						}}
					>
						So that we know how to call you.
					</Text>
				</View>

				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSignUp}
				>
					{({ handleSubmit, handleBlur }) => {
						return (
							<>
								<InputField
									icon={
										<Feather
											name="user"
											size={20}
											color={gray500}
											style={{ marginRight: 5 }}
										/>
									}
									name={'username'}
									placeholder={'Username'}
									keyboardType={'email-address'}
									onBlur={handleBlur}
									value={name}
									setValue={setName}
								></InputField>
								<View style={styles.buttonContainer}>
									<Button
										label="Continue"
										colorBg={primary}
										colorText={white}
										align="center"
										submitAction={next}
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

export default Name;

const styles = StyleSheet.create({});
