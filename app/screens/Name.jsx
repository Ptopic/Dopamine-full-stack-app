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
import Button from '@Components/Button';
import InputField from '@Components/InputField';
import StepsDisplay from '../components/StepsDisplay';

// Colors
import { colors } from '../constants/colors';
const { primary, white, background400, gray500, gray400 } = colors;

const Name = () => {
	const [name, setName] = useState('');

	const navigation = useNavigation();

	const initialValues = {
		name: '',
	};

	const validationSchema = yup.object({
		name: yup.string().required('Name is missing'),
	});

	const next = (values, formikActions) => {
		console.log(values, formikActions);
		console.log('test');
		formikActions.resetForm();
		navigation.navigate('Gender');
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header
				noArrow={true}
				color={primary}
				el={<StepsDisplay active={1} numOfSteps={5}></StepsDisplay>}
			/>
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
									name={'name'}
									placeholder={'name'}
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
			</View>
		</SafeAreaView>
	);
};

export default Name;

const styles = StyleSheet.create({});
