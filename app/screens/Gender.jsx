import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Animated,
	TouchableOpacity,
	TextInput,
	Pressable,
	Dimensions,
	Image,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/core';

// Formik
import { updateNotification } from '../utils/helper';
import { signin } from '../utils/auth';
import { Formik } from 'formik';
import * as yup from 'yup';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

// Components
import Header from '@Components/Header';
import RegularButton from '@Components/RegularButton';
import InputField from '../components/InputField';
import StepsDisplay from '../components/StepsDisplay';
import Spinner from '../components/Spinner';

import AntDesign from 'react-native-vector-icons/AntDesign';

// Colors
import { colors } from '../constants/colors';
const { primary, white, background400, gray500, gray400 } = colors;

const Gender = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [femaleFocused, setFemaleFocused] = useState(true);
	const [maleFocused, setMaleFocused] = useState(false);

	const navigation = useNavigation();

	const initialValues = {
		gender: '',
	};

	const validationSchema = yup.object({
		gender: yup.string().required('Gender is missing'),
	});

	const next = () => {
		navigation.navigate('DateOfBirth');
	};

	const selectGenderFemale = () => {
		console.log('Select gender');
		setFemaleFocused(true);
		setMaleFocused(false);

		// Set redux state value to female
	};

	const selectGenderMale = () => {
		console.log('Select gender');
		setMaleFocused(true);
		setFemaleFocused(false);

		// Set redux state value to male
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header
				route={'Name'}
				color={primary}
				el={<StepsDisplay active={2} numOfSteps={5}></StepsDisplay>}
			/>
			<View style={{ paddingHorizontal: 25, flex: 1 }}>
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
							color: white,
						}}
					>
						Whats your gender?
					</Animated.Text>
				</View>

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<Pressable onPress={selectGenderFemale}>
						<View
							style={[
								femaleFocused ? styles.genderView : styles.genderViewInactive,
							]}
						>
							<View style={[styles.selectedCheckView]}>
								{femaleFocused ? (
									<AntDesign name="checkcircle" size={24} color={primary} />
								) : (
									<View style={[styles.selectedCheckInactive]}></View>
								)}

								{/* <AntDesign
									name="checkcircle"
									size={24}
									color={primary}
									style={{ marginRight: 10 }}
								/> */}
							</View>
							<View style={[styles.imageView]}>
								<Image
									onLoadStart={() => console.log('Loading')}
									onLoad={() => console.log('Loaded')}
									source={require('../assets/images/female.png')}
									style={[
										femaleFocused
											? styles.genderImage
											: styles.genderImageInactive,
									]}
								></Image>
							</View>

							<View style={[styles.textView]}>
								<Text
									style={[
										femaleFocused
											? styles.genderText
											: styles.genderTextInactive,
									]}
								>
									Female
								</Text>
							</View>
						</View>
					</Pressable>

					<Pressable onPress={selectGenderMale}>
						<View
							style={[
								maleFocused ? styles.genderView : styles.genderViewInactive,
							]}
						>
							<View style={[styles.selectedCheckView]}>
								{maleFocused ? (
									<AntDesign name="checkcircle" size={24} color={primary} />
								) : (
									<View style={[styles.selectedCheckInactive]}></View>
								)}

								{/* <AntDesign
									name="checkcircle"
									size={24}
									color={primary}
									style={{ marginRight: 10 }}
								/> */}
							</View>
							<View style={[styles.imageView]}>
								<Image
									onLoadStart={() => console.log('Loading')}
									onLoad={() => console.log('Loaded')}
									source={require('../assets/images/male.png')}
									style={[
										maleFocused
											? styles.genderImage
											: styles.genderImageInactive,
									]}
								></Image>
							</View>

							<View style={[styles.textView]}>
								<Text
									style={[
										maleFocused ? styles.genderText : styles.genderTextInactive,
									]}
								>
									Male
								</Text>
							</View>
						</View>
					</Pressable>
				</View>

				<View style={styles.buttonContainer}>
					<RegularButton
						label="Next"
						colorBg={primary}
						colorText={white}
						submitAction={next}
						align="center"
						fontWeight="bold"
						fontSize={16}
					></RegularButton>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Gender;

const { width } = Dimensions.get('window');

const inputWidth = Math.round(width / 2.5);

const styles = StyleSheet.create({
	genderView: {
		width: inputWidth * '1.05',
		height: inputWidth * '1.15',
		padding: 20,
		borderColor: primary,
		borderWidth: 2,
		borderRadius: 20,
	},

	genderViewInactive: {
		width: inputWidth * '1.05',
		height: inputWidth * '1.15',
		padding: 20,
		borderColor: gray400,
		borderWidth: 2,
		borderRadius: 20,
	},

	selectedCheckView: {
		position: 'absolute',
		padding: 15,
		right: 0,
	},

	selectedCheck: {
		width: 24,
		height: 24,
		borderRadius: '50%',
		backgroundColor: primary,
	},

	selectedCheckInactive: {
		width: 24,
		height: 24,
		borderRadius: '50%',
		backgroundColor: gray400,
	},
	imageView: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
	},

	genderImage: {
		width: '80%',
		height: '80%',
	},

	genderImageInactive: {
		width: '80%',
		height: '80%',
		opacity: 0.8,
	},
	textView: { justifyContent: 'center', alignItems: 'center' },

	genderText: {
		color: white,
	},

	genderTextInactive: {
		color: gray400,
	},

	buttonContainer: {
		marginTop: 40,
	},
});
