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
import Logo from '@Assets/images/Logo3.png';

// Components
import RegularButton from '@Components/RegularButton';
import Button from '@Components/Button';
import InputField from '@Components/InputField';
import Spinner from '../components/Spinner';

const StarterScreen = () => {
	const [loading, setLoading] = useState(false);
	StatusBar.setBarStyle('dark-content', true);

	const navigation = useNavigation();

	const beginJourney = () => {
		navigation.navigate('Login');
	};

	useEffect(() => {
		console.log('Page loaded');

		// setLoading(false);

		// Fire animations
	}, []);
	return (
		<SafeAreaView style={styles.starterSatusBar}>
			{loading ? (
				<Spinner></Spinner>
			) : (
				<View style={styles.starterContainer}>
					<View style={styles.imageContainer}>
						<Image source={Logo} style={styles.image}></Image>
					</View>

					<View style={{ height: '10%' }}>
						<RegularButton
							label="Begin your journey"
							colorBg="#1769fd"
							colorText="white"
							align="space-between"
							icon={
								<MaterialIcons name="arrow-forward" size={32} color="#fff" />
							}
							fontWeight="bold"
							fontSize={16}
							submitAction={beginJourney}
						></RegularButton>
					</View>
				</View>
			)}
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
		width: '100%',
		resizeMode: 'contain',
	},
});
