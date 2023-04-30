import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Animated,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Image,
	Pressable,
	FlatList,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/core';

// Formik
import { updateNotification } from '../utils/helper';
import { signin } from '../utils/auth';
import { Formik } from 'formik';
import * as yup from 'yup';

// Axios

import axios from 'axios';

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Components
import Header from '@Components/Header';
import RegularButton from '@Components/RegularButton';
import RegularInputField from '../components/RegularInputField';
import StepsDisplay from '../components/StepsDisplay';

// Colors
import { colors } from '../constants/colors';
const { primary, white, background400, gray500, gray400 } = colors;

const Country = () => {
	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState('');
	const [countryValue, setCountryValue] = useState('');
	const [data, setData] = useState([]);
	const [formatedData, setFormatedData] = useState({
		names: [],
		flags: [],
	});
	const navigation = useNavigation();

	useEffect(() => {
		axios
			.get('https://restcountries.com/v3.1/all?fields=name,flags')
			.then((res) => {
				setData(res.data);
				// console.log(data[0]['name']['common']);
				// console.log(data[0]['flags']['svg']);
			})
			.catch((error) => {
				console.log(error);
			});
		// console.log(formatedData);
	}, []);

	useEffect(() => {
		formatCountryData();
	}, [data]);

	const formatCountryData = () => {
		let namesArray = [];
		let flagsArray = [];
		data.forEach((element) => {
			const name = element['name']['common'];
			const flag = element['flags']['png'];
			namesArray.push(name);
			flagsArray.push(flag);
		});
		const newData = { ...formatedData };
		newData['names'] = namesArray;
		newData['flags'] = flagsArray;
		setFormatedData(newData);
	};

	const next = () => {
		if (countryValue == '') {
			setError('Country is required');
		} else {
			setCountryValue('');
			navigation.replace('PhoneNumber');
		}
	};

	const handleFocus = () => {
		console.log('Focused');
		setShowModal(true);
	};

	const handleUnFocus = () => {
		countryValue == '' ? setError('Country is requires') : setError('');
	};

	const handlePress = (index) => {
		console.log('Un focused');
		setError('');
		setCountryValue(formatedData['names'][index]);

		setShowModal(false);
	};

	const handleOnChange = (value) => {
		setError('');
		setCountryValue(value);
		// Debounce api call for 500ms
		const getData = setTimeout(() => {
			axios
				.get(`https://restcountries.com/v3.1/name/${value}?fields=name,flags`)
				.then((res) => {
					setData(res.data);
					formatCountryData();
					// console.log(data[0]['name']['common']);
					// console.log(data[0]['flags']['svg']);
				})
				.catch((error) => {
					console.log(error);
				});
		}, 500);

		return () => clearTimeout(getData);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header
				route={'DateOfBirth'}
				color={primary}
				el={<StepsDisplay active={4} numOfSteps={5}></StepsDisplay>}
			/>
			<View style={{ paddingHorizontal: 20, flex: 1 }}>
				<View
					style={{
						alignItems: 'flex-start',
						paddingTop: 20,
						paddingBottom: 60,
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
						Where are you living?
					</Animated.Text>

					<Text
						style={{
							fontSize: 14,
							marginBottom: 10,
							color: white,
						}}
					>
						So that you can find people near you.
					</Text>
				</View>

				{error ? (
					<View>
						<Text style={{ color: '#f44336', marginBottom: 10 }}>{error}</Text>
					</View>
				) : null}
				<RegularInputField
					icon={
						<Ionicons
							name="ios-globe-outline"
							size={20}
							color={gray500}
							style={{ marginRight: 5 }}
						/>
					}
					name={'country'}
					placeholder={'Choose your country'}
					handleFocus={handleFocus}
					value={countryValue}
					handleUnFocus={handleUnFocus}
					handleChange={(text) => handleOnChange(text)}
					// handleUnFocus={handleUnFocus}
				></RegularInputField>
				{showModal ? (
					<ScrollView
						style={{
							backgroundColor: background400,
							marginBottom: formatedData['names'].length < 4 ? 240 : 160,
						}}
					>
						{formatedData['names'].map((el, index) => {
							return (
								<Pressable
									onPress={() => {
										handlePress(index);
									}}
									key={index}
									style={{
										flexDirection: 'row',
										height: 80,
										alignItems: 'center',
										paddingHorizontal: 20,
									}}
								>
									<View style={{ height: 20, width: 40 }}>
										<Image
											source={{
												uri: formatedData['flags'][index],
											}}
											style={{ width: '100%', height: '100%' }}
											resizeMode="cover"
										></Image>
									</View>
									<Text style={{ color: white, paddingLeft: 20 }}>
										{formatedData['names'][index]}
									</Text>
								</Pressable>
							);
						})}
						{/* <View>
											<Text>{formatedData['names']}</Text>
										</View> */}
					</ScrollView>
				) : null}
				<View style={styles.buttonContainer}>
					<RegularButton
						label="Next"
						colorBg={primary}
						colorText={white}
						align="center"
						fontWeight="bold"
						fontSize={16}
						submitAction={next}
					></RegularButton>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Country;

const styles = StyleSheet.create({});
