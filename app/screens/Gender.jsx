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
import Button from '@Components/Button';

// Colors
import { colors } from '../constants/colors';
const { primary, white, background400, gray500, gray400 } = colors;

const Gender = () => {
	const next = () => {
		navigation.replace('RegistrationDone');
	};

	const navigation = useNavigation();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header route={'Country'} color={primary} title={'Step 6 of 6'} />
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
			</View>
		</SafeAreaView>
	);
};

export default Gender;

const styles = StyleSheet.create({});
