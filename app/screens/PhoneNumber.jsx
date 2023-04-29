import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Animated,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/core';

// Formik
import { updateNotification } from '../utils/helper';
import { signin } from '../utils/auth';
import { Formik } from 'formik';
import * as yup from 'yup';

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

// Components
import Header from '@Components/Header';
import InputField from '../components/InputField';
import Button from '@Components/Button';
import Spinner from '@Components/Spinner';
import StepsDisplay from '../components/StepsDisplay';

// Colors
import { colors } from '../constants/colors';
const { primary, white, background400, gray500, gray400 } = colors;

const PhoneNumber = () => {
	const navigation = useNavigation();

	const skip = () => {
		navigation.replace('AnalyzingData');
	};

	const initialValues = {
		phone: '',
	};

	const validationSchema = yup.object({
		phone: yup.string().required('Phone number is missing'),
	});

	const next = (values, formikActions) => {
		console.log(values, formikActions);
		formikActions.resetForm();
		navigation.replace('AnalyzingData');
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header
				route={'Country'}
				color={primary}
				el={<StepsDisplay active={5} numOfSteps={5}></StepsDisplay>}
			/>
			<KeyboardAvoidingView
				behavior="padding"
				iew
				style={{ paddingHorizontal: 20, flex: 1 }}
			>
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
						Add phone number.
					</Text>

					<Text
						style={{
							fontSize: 14,
							marginBottom: 10,
							color: white,
						}}
					>
						if you are not comfortable with it you can skip it.
					</Text>
				</View>

				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={next}
				>
					{() => {
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
									name={'phone'}
									placeholder={'phone'}
								></InputField>
								<View style={styles.buttonContainer}>
									<Button
										label="Next"
										colorBg={primary}
										colorText={white}
										align="center"
										fontWeight="bold"
										fontSize={16}
									></Button>
								</View>
							</>
						);
					}}
				</Formik>

				<TouchableOpacity
					style={{ alignSelf: 'center', marginTop: 20 }}
					onPress={() => skip()}
				>
					<Text style={{ fontSize: 12, color: white }}>Skip</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default PhoneNumber;

const styles = StyleSheet.create({});
