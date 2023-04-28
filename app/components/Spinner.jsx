import {
	StyleSheet,
	Text,
	View,
	Animated as ReactAnimated,
	Easing,
} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';

const Spinner = () => {
	return (
		<View style={styles.spinner}>
			<Lottie
				style={{
					height: 150,
					width: 150,
					alignSelf: 'center',
					justifyContent: 'center',
				}}
				source={require('../assets/images/Loading.json')}
				autoPlay
				loop
			/>
		</View>
	);
};

export default Spinner;

const styles = StyleSheet.create({
	spinner: {},
});
