import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import axios from 'axios';

const baseUrl = `http://localhost:3001/api/user`;

function Form() {
	const [invalidUser, setInvalidUser] = useState('');
	const [busy, setBusy] = useState(false);
	const [newPassword, setNewPassword] = useState({
		password: '',
		confirmPassword: '',
	});

	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const location = useLocation();
	const history = useHistory();

	const { token, id } = queryString.parse(location.search);
	const verifyToken = async () => {
		try {
			setBusy(true);
			const data = await axios(
				`${baseUrl}/verify-token?token=${token}&id=${id}`
			);

			setBusy(false);
		} catch (error) {
			if (error?.response?.data) {
				const data = error.response.data;
				if (!data.success) return setInvalidUser(data.error);
				return console.log(error.response.data);
			}
		}
	};

	useEffect(() => {
		verifyToken();
	}, []);

	const handleOnChange = ({ target }) => {
		const { name, value } = target;

		setNewPassword({ ...newPassword, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { password, confirmPassword } = newPassword;
		if (password.trim().length < 8 || password.trim().length > 20) {
			return setError('Password must be 8 to 20 characters long');
		}

		if (password !== confirmPassword) {
			return setError('Passwords does not match');
		}

		try {
			setBusy(true);
			const data = await axios.post(
				`${baseUrl}/reset-password?token=${token}&id=${id}`,
				{ password }
			);

			setBusy(false);
			setError('');
			if (data.data.success) {
				history.replace('/reset-password');
				setSuccess(true);
			}
		} catch (error) {
			setBusy(false);
			if (error?.response?.data) {
				const data = error.response.data;
				if (!data.success) return setError(data.error);
				return console.log(error.response.data);
			}
		}
	};

	if (success)
		return (
			<div className="success-container">
				<h1>Password reset successfully</h1>
			</div>
		);

	if (invalidUser)
		return (
			<div className="invalid-container">
				<h1>{invalidUser}</h1>
			</div>
		);

	if (busy)
		return (
			<div className="spinner-container">
				<div className="loading-spinner"></div>
			</div>
		);
	return (
		<div className="form">
			<h1>Reset password</h1>
			<form onSubmit={handleSubmit} className="form-field">
				{error && (
					<div className="error">
						<p>{error}</p>{' '}
					</div>
				)}
				<input
					type="password"
					name="password"
					id=""
					placeholder="********"
					onChange={handleOnChange}
				/>
				<input
					type="password"
					name="confirmPassword"
					id=""
					placeholder="********"
					onChange={handleOnChange}
				/>
				<input type="submit" value="Reset password" />
			</form>
		</div>
	);
}

export default Form;
