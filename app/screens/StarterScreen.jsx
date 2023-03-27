import {
	StyleSheet,
	Text,
	View,
	Image,
	SafeAreaView,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StatusBar } from 'react-native';
import { Motion } from '@legendapp/motion';

// Assets
import Logo from '@Assets/images/Logo.png';

// Components
import Button from '@Components/Button';
import InputField from '@Components/InputField';

const StarterScreen = () => {
	const [loading, setLoading] = useState(true);
	StatusBar.setBarStyle('dark-content', true);

	const navigation = useNavigation();

	const beginJourney = () => {
		navigation.navigate('Login');
	};

	useEffect(() => {
		console.log('Page loaded');

		setLoading(false);

		// Fire animations
	}, []);
	return (
		<SafeAreaView style={styles.starterSatusBar}>
			<View style={styles.starterContainer}>
				{/* {loading ? <Text>Loading...</Text> : <Text>Not loading</Text>} */}
				<View style={styles.imageContainer}>
					<Image source={Logo} style={styles.image}></Image>
					<Text>Dopamine</Text>
				</View>

				<View style={{ height: '10%' }}>
					<Button
						label="Begin your journey"
						colorBg="#0782F9"
						colorText="white"
						align="space-between"
						icon={<MaterialIcons name="arrow-forward" size={32} color="#fff" />}
						fontWeight="bold"
						fontSize={16}
						submitAction={beginJourney}
					></Button>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default StarterScreen;

const styles = StyleSheet.create({
	starterSatusBar: {},
	starterContainer: {
		paddingHorizontal: 25,
	},
	imageContainer: {
		height: '90%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: '80%',
		resizeMode: 'contain',
	},
});
