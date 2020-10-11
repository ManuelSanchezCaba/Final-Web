import React, { Component } from 'react';
import '../styles/Login.css';
import { Redirect } from 'react-router-dom';
import firebase from '../firebase';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: {
				email: '',
				password: '',
			},
			redirect: false,
		};
	}

	submit = async (e) => {
		try {
			e.preventDefault();
			await firebase.login(this.state.login.email, this.state.login.password);
			// console.log(this.state.redirect);
			this.setState({ redirect: true });
		} catch (error) {
			alert(error.message);
		}
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to={'/crud'} />;
		}

		return (
			<div className='caja-h d-flex justify-content-center align-items-center container p-4'>
				<form className='card card-body rounded'>
					<h1>Sign In</h1>
					<div className='form-group'>
						<label htmlFor='email'>Email address</label>
						<input
							type='email'
							id='email'
							placeholder='Enter email'
							name='email'
							className='form-control'
							onChange={(e) => {
								let { login } = this.state;
								login.email = e.target.value;
								this.setState({ login });
							}}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							placeholder='password'
							name='password'
							className='form-control'
							onChange={(e) => {
								let { login } = this.state;
								login.password = e.target.value;
								this.setState({ login });
							}}
						/>
					</div>
					<div className='form-check'>
						<input type='checkbox' id='remember' className='form-check-input' />
						<label htmlFor='remember'>Remember me</label>
					</div>
					<div className='form-group'>
						<input
							type='submit'
							name='login'
							value='Submit'
							className='btn btn-primary btn-block'
							onClick={this.submit}
						/>
					</div>
					<div className='d-flex justify-content-end'>
						<label htmlFor='remember'>
							Forgot <a href='#top'>password?</a>
						</label>
					</div>
				</form>
			</div>
		);
	}
}
