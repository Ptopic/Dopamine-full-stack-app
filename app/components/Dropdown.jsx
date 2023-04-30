import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';

const Dropdown = ({
	icon,
	values,
	searchIcon,
	selectedIcon,
	onPress,
	isOpen,
	flagUrl,
}) => {
	return (
		<Pressable style={styles.dropDownView} onPress={onPress}>
			<View style={styles.buttonView}>
				<View
					style={{ width: 60, alignItems: 'center', justifyContent: 'center' }}
				>
					<Image
						source={{ uri: flagUrl }}
						style={{ width: '70%', height: '70%' }}
						resizeMode="contain"
					></Image>
				</View>
			</View>

			<View>{icon}</View>
		</Pressable>
	);
};

export default Dropdown;

const styles = StyleSheet.create({
	dropDownView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		flexDirection: 'row',
		paddingHorizontal: 10,
		borderTopLeftRadius: 16,
		borderBottomLeftRadius: 16,
		backgroundColor: '#292C36',
	},
	buttonView: { flexDirection: 'row' },
});
