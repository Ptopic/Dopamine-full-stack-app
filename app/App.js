import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens
import LoginScreen from './screens/LoginScreen';
import ForgotPassword from './screens/ForgotPassword';
import HomeScreen from './screens/HomeScreen';
import StarterScreen from './screens/StarterScreen';
import SignUp from './screens/SignUp';
import EmailConfirmationScreen from './screens/EmailConfirmationScreen';
import Steps from './screens/Steps';
import PhoneNumber from './screens/PhoneNumber';
import Name from './screens/Name';
import DateOfBirth from './screens/DateOfBirth';
import Country from './screens/Country';
import Gender from './screens/Gender';
import Test from './screens/Test';
import AnalyzingData from './screens/AnalyzingData';
import { Provider } from 'react-redux';
import store from '@Redux/store';

const Stack = createNativeStackNavigator();

// Colors
import { colors } from './constants/colors';
const { background500, white } = colors;

const MyTheme = {
	...DefaultTheme,
	colors: {
		background: background500,
		text: white,
	},
};
// const navTheme = DefaultTheme;
// navTheme.colors.background = '#141416';
// navTheme.colors.text = '#ffffff';

export default function App() {
	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<StatusBar backgroundColor="#61dafb" barStyle="dark-content" />
				<NavigationContainer theme={MyTheme}>
					{/* set initialRouteName to redux last visited screen */}
					<Stack.Navigator initialRouteName="PhoneNumber">
						<Stack.Screen
							options={{ headerShown: false }}
							name="Starter"
							component={StarterScreen}
						/>
						<Stack.Screen
							options={{ headerShown: false, title: '' }}
							name="Login"
							component={LoginScreen}
						/>
						<Stack.Screen
							options={{ headerShown: false, title: '' }}
							name="Forgot"
							component={ForgotPassword}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="SignUp"
							component={SignUp}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="EmailConfirmationScreen"
							component={EmailConfirmationScreen}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="Home"
							component={HomeScreen}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="Steps"
							component={Steps}
						/>
						{/* Step 1 */}
						<Stack.Screen
							options={{ headerShown: false }}
							name="Name"
							component={Name}
						/>
						{/* Step 2 */}
						<Stack.Screen
							options={{ headerShown: false }}
							name="Gender"
							component={Gender}
						/>
						{/* Step 3 */}
						<Stack.Screen
							options={{ headerShown: false }}
							name="DateOfBirth"
							component={DateOfBirth}
						/>
						{/* Step 4 */}
						<Stack.Screen
							options={{ headerShown: false }}
							name="Country"
							component={Country}
						/>
						{/* Step 5 */}
						<Stack.Screen
							options={{ headerShown: false }}
							name="PhoneNumber"
							component={PhoneNumber}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="AnalyzingData"
							component={AnalyzingData}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="Test"
							component={Test}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaProvider>
		</Provider>
	);
}

const styles = StyleSheet.create({});
