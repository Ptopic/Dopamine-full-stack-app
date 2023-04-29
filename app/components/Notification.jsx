import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

// Colors
import { colors } from '../constants/colors';
const { error, success, white } = colors;

export default function Notification({ type, text }) {
	const backgroundColor = type === 'error' ? error : success;
	return (
		<View style={[styles.container, { backgroundColor }]}>
			<Text style={{ color: white, fontSize: 16 }}>{text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		padding: 15,
		height: 60,
		position: 'absolute',
		width: '120%',
		top: 0,
		left: 0,
		zIndex: 5,
	},
});
