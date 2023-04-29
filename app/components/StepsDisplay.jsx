import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

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

const StepsDisplay = ({ active, numOfSteps }) => {
	const steps = Array(numOfSteps).fill('');

	return (
		<View
			style={{
				paddingHorizontal: 20,
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'row',
			}}
		>
			{steps.map((input, index) => {
				const activeColor = index === active - 1 ? primary : background400;
				console.log(activeColor);
				return (
					<View
						key={index}
						style={[styles.bar, { backgroundColor: activeColor }]}
					></View>
				);
			})}
		</View>
	);
};

export default StepsDisplay;

const styles = StyleSheet.create({
	bar: {
		width: 20,
		height: 5,
		backgroundColor: background400,
		borderRadius: 20,
		marginHorizontal: 5,
	},
});
