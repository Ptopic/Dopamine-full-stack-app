import {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useFormikContext } from 'formik';

const InputField = ({
	name,
	placeholder,
	icon,
	inputType,
	keyboardType,
	fieldButtonLabel,
	fieldButtonFunction,
	...rest
}) => {
	const { errors, values, touched, handleBlur, handleChange } =
		useFormikContext();

	const value = values[name];
	const error = errors[name];
	const isInputTouched = touched[name];

	return (
		<>
			{error && isInputTouched ? (
				<View>
					<Text>{error}</Text>
				</View>
			) : null}
			<View style={styles.inputView}>
				{icon}
				{inputType == 'password' ? (
					<TextInput
						value={value}
						onChangeText={handleChange(name)}
						onBlur={handleBlur(name)}
						placeholder={placeholder}
						keyboardType={keyboardType}
						style={styles.passwordInput}
						secureTextEntry={true}
						{...rest}
					></TextInput>
				) : (
					<TextInput
						value={value}
						onChangeText={handleChange(name)}
						onBlur={handleBlur(name)}
						placeholder={placeholder}
						keyboardType={keyboardType}
						style={styles.regularInput}
					/>
				)}
				<TouchableOpacity onPress={fieldButtonFunction}>
					<Text style={styles.fieldButtonStyle}>{fieldButtonLabel}</Text>
				</TouchableOpacity>
			</View>
		</>
	);
};

export default InputField;

const styles = StyleSheet.create({
	inputView: {
		flexDirection: 'row',
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		paddingBottom: 8,
		marginBottom: 25,
	},
	passwordInput: { flex: 1, paddingVertical: 0 },
	regularInput: { flex: 1, paddingVertical: 0 },
	fieldButtonStyle: { color: '#AD40AF', fontWeight: '700' },
});
