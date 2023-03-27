import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

// Assets

import GoogleSvg from '@Assets/images/socials/google.svg';
import FacebookSvg from '@Assets/images/socials/facebook.svg';
import TwitterSvg from '@Assets/images/socials/twitter.svg';

const OtherLogins = () => {
	const handleGoogleLogIn = () => {
		alert('Google login');
	};

	const handleFacebookLogIn = () => {
		alert('Facebook login');
	};

	const handleTwitterLogIn = () => {
		alert('Twitter login');
	};
	return (
		<View>
			<View style={styles.otherLoginContainer}>
				<Text style={{ fontSize: 10, color: '#666' }}>Or, login with...</Text>
			</View>
			<View style={styles.otherLoginOptionsCollection}>
				<TouchableOpacity
					style={styles.otherLoginOptionsButton}
					onPress={handleGoogleLogIn}
				>
					<GoogleSvg height={32} width={32} />
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.otherLoginOptionsButton}
					onPress={handleFacebookLogIn}
				>
					<FacebookSvg height={32} width={32} />
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.otherLoginOptionsButton}
					onPress={handleTwitterLogIn}
				>
					<TwitterSvg height={32} width={32} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default OtherLogins;

const styles = StyleSheet.create({
	otherLoginContainer: {
		padding: 30,
		alignItems: 'center',
	},
	otherLoginOptionsCollection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 30,
	},
	otherLoginOptionsButton: {
		borderColor: '#ddd',
		borderWidth: 2,
		borderRadius: 10,
		paddingHorizontal: 30,
		paddingVertical: 10,
	},
});
