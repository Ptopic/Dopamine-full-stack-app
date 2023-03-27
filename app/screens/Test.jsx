import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '@Redux/slices/counterSlice';

const Test = () => {
	const count = useSelector((state) => state.counter.value);
	const dispatch = useDispatch();

	return (
		<View style={{ paddingVertical: 25, paddingHorizontal: 25 }}>
			<Text>{count}</Text>
			<TouchableOpacity onPress={() => dispatch(increment())}>
				<Text>Increment</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => dispatch(decrement())}>
				<Text>Decrement</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Test;

const styles = StyleSheet.create({});
