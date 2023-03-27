import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

// Assets
import GoogleSvg from '@Assets/images/socials/google.svg';
import FacebookSvg from '@Assets/images/socials/facebook.svg';
import TwitterSvg from '@Assets/images/socials/twitter.svg';

const OtherSignUps = () => {
	const handleGoogleRegister = () => {
		alert('Google Register');
	};

	const handleFacebookRegister = () => {
		alert('Facebook Register');
	};

	const handleTwitterRegister = () => {
		alert('Twitter Register');
	};
	return (
		<View>
			<View style={styles.otherRegisterOptionsCollection}>
				<TouchableOpacity
					style={styles.otherRegisterOptionsButton}
					onPress={handleGoogleRegister}
				>
					<GoogleSvg height={32} width={32} />
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.otherRegisterOptionsButton}
					onPress={handleFacebookRegister}
				>
					<FacebookSvg height={32} width={32} />
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.otherRegisterOptionsButton}
					onPress={handleTwitterRegister}
				>
					<TwitterSvg height={32} width={32} />
				</TouchableOpacity>
			</View>

			<Text style={styles.otherRegisterText}>Or, register with email ...</Text>
		</View>
	);
};

export default OtherSignUps;

const styles = StyleSheet.create({
	otherRegisterOptionsCollection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 25,
		marginBottom: 30,
	},
	otherRegisterOptionsButton: {
		borderColor: '#ddd',
		borderWidth: 2,
		borderRadius: 10,
		paddingHorizontal: 30,
		paddingVertical: 10,
	},

	otherRegisterText: {
		textAlign: 'center',
		fontSize: 10,
		color: '#666',
		paddingBottom: 30,
	},
});
