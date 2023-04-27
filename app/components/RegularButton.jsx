import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

const RegularButton = ({
	label,
	colorBg,
	colorText,
	icon,
	submitAction,
	width,
	align,
	fontSize,
	fontWeight,
}) => {
	return (
		<View>
			<TouchableOpacity
				style={{
					backgroundColor: colorBg,
					width: width,
					padding: 15,
					borderRadius: 20,
					flexDirection: 'row',
					justifyContent: align,
				}}
				onPress={submitAction}
			>
				<Text
					style={{
						color: colorText,
						fontSize: fontSize,
						fontWeight: fontWeight,
					}}
				>
					{label}
				</Text>
				{icon}
			</TouchableOpacity>
		</View>
	);
};

export default RegularButton;
