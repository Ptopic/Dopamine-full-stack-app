import {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useFormikContext } from 'formik';

// Colors
import { colors } from '../constants/colors';
const { errorText, gray400, white, background400 } = colors;

const RegularInputField = ({
	name,
	value,
	placeholder,
	icon,
	inputType,
	keyboardType,
	fieldButtonLabel,
	handleChange,
	handleFocus,
	handleUnFocus,
	fieldButtonFunction,
	...rest
}) => {
	return (
		<View style={styles.inputView}>
			<View style={{ alignSelf: 'center' }}>{icon}</View>
			{inputType == 'password' ? (
				<TextInput
					textContentType="none"
					keyboardAppearance="dark"
					value={value}
					onChangeText={handleChange(value)}
					onBlur={handleFocus()}
					placeholder={placeholder}
					placeholderTextColor={gray400}
					keyboardType={keyboardType}
					style={styles.passwordInput}
					secureTextEntry={true}
					{...rest}
				></TextInput>
			) : (
				<TextInput
					textContentType="none"
					keyboardAppearance="dark"
					value={value}
					onChangeText={handleChange}
					onFocus={handleFocus}
					onBlur={handleUnFocus}
					placeholder={placeholder}
					placeholderTextColor={gray400}
					keyboardType={keyboardType}
					style={styles.regularInput}
				/>
			)}
			<TouchableOpacity onPress={fieldButtonFunction}>
				<Text style={styles.fieldButtonStyle}>{fieldButtonLabel}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default RegularInputField;

const styles = StyleSheet.create({
	inputView: {
		flexDirection: 'row',
		backgroundColor: background400,
		paddingHorizontal: 15,
		paddingVertical: 12,
		borderRadius: 16,
		marginBottom: 25,
	},
	passwordInput: { flex: 1, paddingVertical: 10, color: white },
	regularInput: {
		flex: 1,
		paddingVertical: 10,
		color: white,
	},
	fieldButtonStyle: { color: '#AD40AF', fontWeight: '700' },
});
