import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Header = ({ route, color, title, backgroundColor, el, noArrow }) => {
	const navigation = useNavigation();

	const back = () => {
		navigation.navigate(route);
	};
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				paddingHorizontal: 15,
				backgroundColor: backgroundColor,
			}}
		>
			{!noArrow && (
				<TouchableOpacity style={styles.backButton} onPress={back}>
					<MaterialIcons name="arrow-back" size={36} color={color} />
				</TouchableOpacity>
			)}

			<View style={{ flexGrow: 1, marginRight: 50 }}>
				<Text style={{ textAlign: 'center', color: 'white' }}>{title}</Text>
				{el}
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	backButton: {
		paddingVertical: 5,
	},
});
