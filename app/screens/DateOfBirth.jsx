import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Animated,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import DateTimePicker from '@react-native-community/datetimepicker';

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
import RegularButton from '@Components/RegularButton';
import StepsDisplay from '../components/StepsDisplay';

// Colors
import { colors } from '../constants/colors';
const { primary, white, background400, gray500, gray400 } = colors;

const DateOfBirth = () => {
	const [date, setDate] = useState(new Date(Date.now()));

	const navigation = useNavigation();

	const onChange = (event, value) => {
		const dateFormat = value;
		const stringValue = JSON.stringify(value);
		const onlyDate = stringValue.match('[0-9]{4}-[0-9]{2}-[0-9]{2}')[0];
		setDate(dateFormat);
		// set only date to global redux state
		console.log(onlyDate);
	};

	const next = (values, formikActions) => {
		navigation.replace('Country');
	};

	useEffect(() => {}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header
				route={'Gender'}
				color={primary}
				el={<StepsDisplay active={3} numOfSteps={5}></StepsDisplay>}
			/>
			<View style={{ paddingHorizontal: 20, flex: 1 }}>
				<View
					style={{
						alignItems: 'flex-start',
						paddingTop: 20,
						paddingBottom: 80,
					}}
				>
					<Animated.Text
						style={{
							fontSize: 25,
							fontWeight: 'bold',
							marginBottom: 20,
							color: white,
						}}
					>
						When were you born, Name?
					</Animated.Text>

					<Text
						style={{
							fontSize: 14,
							marginBottom: 10,
							color: white,
						}}
					>
						So that we dont forget your birthday.
					</Text>
				</View>

				<DateTimePicker
					mode="date"
					value={date}
					onChange={onChange}
					display="spinner"
					textColor={white}
				/>
				<View style={styles.buttonContainer}>
					<RegularButton
						label="Next"
						submitAction={next}
						colorBg={primary}
						colorText={white}
						align="center"
						fontWeight="bold"
						fontSize={16}
					></RegularButton>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default DateOfBirth;

const styles = StyleSheet.create({
	buttonContainer: {
		marginTop: 15,
	},
});
