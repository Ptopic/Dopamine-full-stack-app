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
import DateTimePicker from '@react-native-community/datetimepicker';

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

// Components
import Header from '@Components/Header';
import Button from '@Components/Button';

const DateOfBirth = () => {
	const [date, setDate] = useState(new Date(Date.now()));
	const next = () => {
		navigation.replace('Country');
	};

	const navigation = useNavigation();

	const onChange = (event, value) => {
		const stringValue = JSON.stringify(value);
		const onlyDate = stringValue.match('[0-9]{4}-[0-9]{2}-[0-9]{2}')[0];
		setDate(onlyDate);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header route={'Username'} color={'#1769fd'} title={'Step 4 of 6'} />
			<View style={{ paddingHorizontal: 20, flex: 1 }}>
				<View
					style={{
						alignItems: 'flex-start',
						paddingTop: 20,
						paddingBottom: 120,
					}}
				>
					<Animated.Text
						style={{
							fontSize: 25,
							fontWeight: 'bold',
							marginBottom: 20,
							color: 'white',
						}}
					>
						When were you born, Name?
					</Animated.Text>

					<Text
						style={{
							fontSize: 14,
							marginBottom: 10,
							color: 'white',
						}}
					>
						So that we dont forget your birthday.
					</Text>
				</View>

				<View style={{ marginBottom: 15 }}>
					{/* Date picker */}
					<Text style={{ color: 'white' }}>Select your date of birth?</Text>
					<DateTimePicker
						mode="date"
						value={date}
						onChange={onChange}
						display="spinner"
						textColor="white"
					/>
				</View>

				<View style={styles.buttonContainer}>
					<Button
						label="Continue"
						colorBg="#1769fd"
						colorText="white"
						align="center"
						submitAction={next}
						fontWeight="bold"
						fontSize={16}
					></Button>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default DateOfBirth;

const styles = StyleSheet.create({});
