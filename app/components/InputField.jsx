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

	focusedInput = () => {
		this.textInput.setNativeProps({
			style: { backgroundColor: 'green' },
		});
	};

	blurredInput = () => {
		this.textInput.setNativeProps({
			style: { backgroundColor: 'yellow' },
		});
	};

	return (
		<>
			{error && isInputTouched ? (
				<View>
					<Text style={{ color: '#f44336', marginBottom: 10 }}>{error}</Text>
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
						placeholderTextColor={'#acb3bc'}
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
						placeholderTextColor={'#acb3bc'}
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
		backgroundColor: '#353945',
		paddingHorizontal: 15,
		paddingVertical: 22,
		borderRadius: 16,
		marginBottom: 25,
	},
	passwordInput: { flex: 1, paddingVertical: 0, color: 'white' },
	regularInput: { flex: 1, paddingVertical: 0, color: 'white' },
	fieldButtonStyle: { color: '#AD40AF', fontWeight: '700' },
});
