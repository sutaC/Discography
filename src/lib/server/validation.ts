interface ValidationError {
	property: string;
	error: string;
}

interface ValidationResultObj {
	success: boolean;
	errors: ValidationError[];
}

interface ValidationResult {
	success: boolean;
	message?: string;
}

function ValidationError(property: string, error: string): ValidationError {
	return {
		property,
		error
	};
}

function ValidationResultsObj(): ValidationResultObj {
	return {
		success: true,
		errors: []
	};
}

function parseValidationResult(vr: ValidationResultObj): ValidationResult {
	return {
		success: vr.success,
		message: '| ' + vr.errors.map((vrerr) => `${vrerr.property} - ${vrerr.error}`).join('\n| ')
	};
}

// User data

export interface UserData {
	login: string;
	password: string;
}

export function validateUserData(userData: UserData): ValidationResult {
	const vr = ValidationResultsObj();

	// Login
	if (userData.login.length < 2) {
		vr.success = false;
		vr.errors.push(ValidationError('login', 'length should be min. 2 characters long'));
	} else if (userData.login.length > 32) {
		vr.success = false;
		vr.errors.push(ValidationError('login', 'length should be max. 32 characters long'));
	} else if (userData.login.match(/[^\w\-\!\$\%\^\&\*\#\?\@]{1,}/gm) !== null) {
		vr.success = false;
		vr.errors.push(
			ValidationError(
				'login',
				'has illegal characters. (Legal characters are a-z, A-Z, 0-9, !$&^*#?@.,:)'
			)
		);
	}

	// Password
	if (userData.password.length < 8) {
		vr.success = false;
		vr.errors.push(ValidationError('password', 'length should be min. 2 characters long'));
	} else if (userData.password.length > 32) {
		vr.success = false;
		vr.errors.push(ValidationError('password', 'length should be max. 32 characters long'));
	} else if (userData.password.match(/[^\w\-\!\$\%\^\&\*\#\?\@]{1,}/gm) !== null) {
		vr.success = false;
		vr.errors.push(
			ValidationError(
				'password',
				'has illegal characters. (Legal characters are a-z, A-Z, 0-9, !$&^*#?@.,:)'
			)
		);
	}

	return parseValidationResult(vr);
}
