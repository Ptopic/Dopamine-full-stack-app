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

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

// Components
import Header from '@Components/Header';
import Button from '@Components/Button';

const PhoneNumber = () => {
	const next = () => {
		navigation.replace('Name');
	};

	const skip = () => {
		navigation.replace('Name');
	};

	const navigation = useNavigation();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header route={'Username'} color={'#1769fd'} title={'Step 2 of 6'} />
			<VKeyboardAvoidingView
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
							color: 'white',
						}}
					>
						Add phone number.
					</Text>

					<Text
						style={{
							fontSize: 14,
							marginBottom: 10,
							color: 'white',
						}}
					>
						if you are not comfortable with it you can skip it.
					</Text>
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

				<TouchableOpacity
					style={{ alignSelf: 'center', marginTop: 20 }}
					onPress={() => skip()}
				>
					<Text style={{ fontSize: 12, color: 'white' }}>Skip</Text>
				</TouchableOpacity>
			</VKeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default PhoneNumber;

const styles = StyleSheet.create({});
