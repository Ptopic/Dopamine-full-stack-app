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
import InputField from '@Components/InputField';

const Username = () => {
	const [username, setUsername] = useState('');

	const next = () => {
		// Add username to global userInfo redux reducer
		navigation.replace('PhoneNumber');
	};

	const navigation = useNavigation();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header route={'Steps'} color={'#0782F9'} title={'Step 1 of 6'} />
			<View style={{ paddingHorizontal: 25, flex: 1 }}>
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
						}}
					>
						Choose a username for your account
					</Text>
				</View>

				<InputField
					label={'Enter a username'}
					value={username}
					setValue={setUsername}
					icon={
						<Feather
							name="user"
							size={20}
							color="#666"
							style={{ marginRight: 5 }}
						/>
					}
				></InputField>
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

export default Username;

const styles = StyleSheet.create({});
