import React, { useState, useRef, useEffect } from 'react';
import styles from './App.module.css';

const sendData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [passwordMatchError, setPasswordMatchError] = useState(false);
	const [passwordError, setPasswordError] = useState(null);

	let error = null;
	const registerButtonRef = useRef(null);

	const handleEmailChange = (e) => {
		e.preventDefault();
		const newEmail = e.target.value;
		setEmail(newEmail);
	};

	const handleInputChange = (e) => {
		e.preventDefault();
		const newPassword = e.target.value;

		if (!/^[\w_]*$/.test(newPassword)) {
			error = 'Пароль должен содержать только буквы и цифры';
		} else if (newPassword.length < 5) {
			error = 'Пароль должен содержать минимум 5 символов';
		}

		setPassword(newPassword);
		checkPasswordMatch(newPassword, repeatPassword);
		setPasswordError(error);
		setPasswordMatchError(newPassword !== repeatPassword);
	};

	const handleRepeateInputChange = (e) => {
		e.preventDefault();
		const newRepeatePassword = e.target.value;
		setRepeatPassword(newRepeatePassword);
		checkPasswordMatch(password, newRepeatePassword);
	};

	const checkPasswordMatch = (newPassword, newRepeatePassword) => {
		setPasswordMatchError(newPassword !== newRepeatePassword);
	};

	const onPasswordRepeatBlur = () => {
		if (password !== repeatPassword) {
			error = 'Пароли не совпадают';
		}
		setPasswordError(error);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendData({ email, password, repeatPassword });
		resetForm();
	};

	const resetForm = () => {
		setEmail('');
		setPassword('');
		setRepeatPassword('');
		setPasswordMatchError(false);
		setPasswordError(null);
	};

	useEffect(() => {
		if (!passwordMatchError) {
			registerButtonRef.current.focus();
		}
	}, [passwordMatchError]);

	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit}>
				{passwordMatchError && (
					<div className={styles.errorLabel}>{passwordError}</div>
				)}
				<input
					name="email"
					type="email"
					value={email}
					placeholder="Почта"
					onChange={handleEmailChange}
				></input>
				<input
					name="password"
					type="password"
					value={password}
					placeholder="Пароль"
					onChange={handleInputChange}
				></input>
				<input
					name="repeatPassword"
					type="password"
					value={repeatPassword}
					placeholder="Повторите пароль"
					onChange={handleRepeateInputChange}
					onBlur={onPasswordRepeatBlur}
				></input>
				<button
					ref={registerButtonRef}
					type="submit"
					disabled={
						passwordMatchError ||
						password.length < 5 ||
						password === '' ||
						repeatPassword === ''
					}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
