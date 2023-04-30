import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Animated,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	Dimensions,
	FlatList,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';

// Formik
import { updateNotification } from '../utils/helper';
import { signin } from '../utils/auth';
import { Formik } from 'formik';
import * as yup from 'yup';

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Components
import Header from '@Components/Header';
import InputField from '../components/InputField';
import Dropdown from '../components/Dropdown';
import DropdownItem from '../components/DropdownItem';
import Button from '@Components/Button';
import Spinner from '@Components/Spinner';
import StepsDisplay from '../components/StepsDisplay';
import RegularButton from '@Components/RegularButton';
import RegularInputField from '../components/RegularInputField';
import SelectDropdown from 'react-native-select-dropdown';

// Colors
import { colors } from '../constants/colors';
const { primary, white, background400, gray500, gray400 } = colors;

const PhoneNumber = () => {
	const [data, setData] = useState([]);
	const [countryValue, setCountryValue] = useState('');
	const [phoneCode, setPhoneCode] = useState('+000');
	const [query, setQuery] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const { width } = Dimensions.get('window');

	const [selectedId, setSelectedId] = useState(0);

	const countries = [
		{ id: 0, name: 'Croatia (+385)', flag: 'https://flagcdn.com/w320/hr.png' },
		{ id: 1, name: 'Croatia (+385)', flag: 'https://flagcdn.com/w320/hr.png' },
		{ id: 2, name: 'Croatia (+385)', flag: 'https://flagcdn.com/w320/hr.png' },
		{ id: 3, name: 'Croatia (+385)', flag: 'https://flagcdn.com/w320/hr.png' },
	];

	const navigation = useNavigation();

	const skip = () => {
		navigation.replace('AnalyzingData');
	};

	const next = () => {};

	const handleFocus = () => {};

	const handleUnFocus = () => {};

	const handlePress = (index) => {};

	const handleOnChange = (value) => {
		setCountryValue(value);
	};

	const openDropDown = () => {
		setIsOpen(!isOpen);
	};

	// Search

	const handleOnChangeQuery = (value) => {
		setQuery(value);
	};
	const handleFocusSearch = () => {};
	const handleUnFocusSearch = () => {};

	const renderItem = (item) => {
		const backgroundColor =
			item.index === selectedId ? '#164FB9' : background400;
		const color = item.index === selectedId ? white : white;

		return (
			<DropdownItem
				item={item}
				onPress={() => setSelectedId(item.index)}
				backgroundColor={backgroundColor}
				textColor={color}
			/>
		);
	};

	useEffect(() => {
		axios
			.get('https://restcountries.com/v3.1/all')
			.then((res) => {
				setData(res.data);
				console.log(res.data[55]);
				// console.log(data[0]['name']['common']);
				// console.log(data[0]['flags']['svg']);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

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

				{/* Custom selectDropDown */}

				<View style={styles.inputView}>
					<View style={{ alignSelf: 'center' }}>
						<Dropdown
							icon={
								<Feather
									name={isOpen ? 'chevron-up' : 'chevron-down'}
									size={24}
									color={primary}
									style={{ marginRight: 5 }}
								/>
							}
							isOpen={isOpen}
							onPress={openDropDown}
						/>
					</View>
					<Text
						style={{
							alignSelf: 'center',
							marginHorizontal: 10,
							color: gray400,
						}}
					>
						{phoneCode}
					</Text>
					<TextInput
						textContentType="none"
						keyboardAppearance="dark"
						value={countryValue}
						onChangeText={(text) => handleOnChange(text)}
						onFocus={handleFocus}
						onBlur={handleUnFocus}
						placeholder={'999 999 999'}
						placeholderTextColor={gray400}
						style={styles.regularInput}
					/>
				</View>

				{/* Dropdown modal */}

				{isOpen ? (
					<View
						style={{
							borderWidth: 2,
							borderColor: primary,
							marginBottom: 50,
							borderRadius: 16,
						}}
					>
						<View style={styles.searchView}>
							<Feather
								name="search"
								size={24}
								color={gray400}
								style={{
									marginRight: 15,
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							/>
							<TextInput
								textContentType="none"
								keyboardAppearance="dark"
								value={query}
								onChangeText={(text) => handleOnChangeQuery(text)}
								onFocus={handleFocusSearch}
								onBlur={handleUnFocusSearch}
								placeholder={'Search'}
								placeholderTextColor={gray400}
								style={styles.dropDownSearch}
							/>
						</View>

						<FlatList
							style={{
								height: 180,
								borderBottomLeftRadius: 16,
								borderBottomRightRadius: 16,
							}}
							data={countries}
							renderItem={renderItem}
							keyExtractor={(item) => item.id}
						></FlatList>
					</View>
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

const styles = StyleSheet.create({
	inputView: {
		flexDirection: 'row',
		backgroundColor: background400,
		paddingRight: 15,
		borderRadius: 16,
		marginBottom: 20,
	},
	regularInput: {
		fontSize: 16,
		flex: 1,
		paddingVertical: 20,
		color: white,
	},

	searchView: {
		flexDirection: 'row',
		backgroundColor: '#292C36',
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	},
	dropDownSearch: {
		width: '100%',
		fontSize: 16,
		color: white,
		height: 50,
	},
});
