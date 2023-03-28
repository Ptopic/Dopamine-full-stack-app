import {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
} from 'react-native';
import React from 'react';

const InputField = ({
	label,
	icon,
	inputType,
	keyboardType,
	fieldButtonLabel,
	fieldButtonFunction,
	value,
	setValue,
}) => {
	return (
		<View style={styles.inputView}>
			{icon}
			{inputType == 'password' ? (
				<TextInput
					value={value}
					onChangeText={(text) => setValue(text)}
					placeholder={label}
					keyboardType={keyboardType}
					style={styles.passwordInput}
					secureTextEntry={true}
				></TextInput>
			) : (
				<TextInput
					value={value}
					onChangeText={(text) => {
						setValue(text);
					}}
					placeholder={label}
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
