import React from 'react';
import Form from './components/Form';
import { Switch, Route } from 'react-router';

function App() {
	return (
		<Switch>
			<Route path="/reset-password" component={Form}></Route>
		</Switch>
	);
}

export default App;
