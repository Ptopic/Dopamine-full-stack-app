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

const Country = () => {
	const next = () => {
		navigation.replace('Gender');
	};

	const navigation = useNavigation();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header route={'DateOfBirth'} color={'#0782F9'} title={'Step 5 of 6'} />
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
						}}
					>
						Where are you living?
					</Animated.Text>

					<Text
						style={{
							fontSize: 14,
							marginBottom: 10,
						}}
					>
						So that you can find people near you.
					</Text>
				</View>

				<View style={styles.buttonContainer}>
					<Button
						label="Continue"
						colorBg="#0782F9"
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

export default Country;

const styles = StyleSheet.create({});
