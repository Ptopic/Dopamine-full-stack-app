import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Notification({ type, text }) {
	const backgroundColor =
		type === 'error' ? 'rgba(255,0,0,0.7)' : 'rgba(0,255,0,0.7)';
	return (
		<View style={[styles.container, { backgroundColor }]}>
			<Text style={{ color: '#fff', fontSize: 16 }}>{text}</Text>
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
