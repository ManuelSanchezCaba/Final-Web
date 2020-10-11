import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Crud from './components/CRUD';

function App() {
	return (
		<Router>
			<Route exact path='/' component={Login} />
			<Route exact path='/crud' component={Crud} />
		</Router>
	);
}

export default App;
