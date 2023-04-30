import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';

const DropdownItem = ({ item, onPress, backgroundColor, textColor }) => {
	console.log(item.item.name);
	return (
		<Pressable
			onPress={onPress}
			style={[styles.dropDownItemView, { backgroundColor }]}
		>
			<View style={{ width: 50, height: '100%', marginRight: 15 }}>
				<Image
					source={{ uri: item.item.flag }}
					style={{ width: 40, height: 30 }}
					resizeMode="center"
				></Image>
			</View>
			<View>
				<Text style={[styles.title, { color: textColor }]}>
					{item.item.name}
				</Text>
			</View>
		</Pressable>
	);
};

export default DropdownItem;

const styles = StyleSheet.create({
	dropDownItemView: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
});
