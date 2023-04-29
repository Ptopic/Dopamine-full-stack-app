import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useFormikContext } from 'formik';

// Colors
import { colors } from '../constants/colors';
const { primary, gray600 } = colors;

const Button = ({
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
	const { handleSubmit, isSubmitting } = useFormikContext();
	return (
		<View>
			<TouchableOpacity
				style={{
					backgroundColor: isSubmitting ? gray600 : colorBg,
					width: width,
					padding: 15,
					borderRadius: 20,
					flexDirection: 'row',
					justifyContent: align,
				}}
				onPress={isSubmitting ? null : handleSubmit}
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

export default Button;
