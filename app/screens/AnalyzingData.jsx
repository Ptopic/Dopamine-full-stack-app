import {
	Animated as ReactAnimated,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
	TextInput,
	Image,
	Easing,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import Lottie from 'lottie-react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	withSequence,
} from 'react-native-reanimated';

// Colors
import { colors } from '../constants/colors';
const { white } = colors;

import { delay } from '../utils/helper';

const AnalyzingData = () => {
	const navigation = useNavigation();
	const animationProgress = useRef(new ReactAnimated.Value(0));

	const opacityAnimation = useSharedValue(0);

	const animatedStyles = useAnimatedStyle(() => ({
		opacity: opacityAnimation.value,
	}));

	useEffect(() => {
		ReactAnimated.timing(animationProgress.current, {
			toValue: 1,
			duration: 1700,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start(async () => {
			// Start text animation
			opacityAnimation.value = withSequence(withTiming(1, 500));

			// Sleep for 1000 ms
			await delay(1000);

			navigation.navigate('Login');
		});
	}, []);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				paddingTop: 20,
				paddingBottom: 120,
			}}
		>
			<Animated.Text style={[styles.text, animatedStyles]}>
				Registration complete!
			</Animated.Text>
			<Lottie
				style={{
					height: 400,
					width: 400,
					alignSelf: 'center',
					justifyContent: 'center',
				}}
				source={require('../assets/images/success.json')}
				progress={animationProgress.current}
			/>
		</SafeAreaView>
	);
};

export default AnalyzingData;

const styles = StyleSheet.create({
	text: {
		color: white,
		fontSize: 22,
		fontWeight: 'bold',
	},
});
