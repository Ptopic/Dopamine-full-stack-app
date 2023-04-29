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

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

// Components
import Header from '@Components/Header';
import RegularButton from '@Components/RegularButton';

// Colors
import { colors } from '../constants/colors';
const {
	primary,
	background500,
	background400,
	gray600,
	gray500,
	gray400,
	white,
	success,
	error,
	errorText,
} = colors;

const Steps = () => {
	const next = () => {
		navigation.replace('Username');
	};

	const navigation = useNavigation();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{/* <Header route={'SignUp'} color={'#0782F9'} /> */}
			<View style={{ paddingHorizontal: 20, flex: 1, paddingTop: 20 }}>
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
						We want to get to know you better 😊
					</Text>
				</View>

				<View style={styles.buttonContainer}>
					<RegularButton
						label="Continue"
						colorBg={primary}
						colorText={white}
						align="center"
						submitAction={next}
						fontWeight="bold"
						fontSize={16}
					></RegularButton>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Steps;

const styles = StyleSheet.create({});
