interface ValidationError {
	property: string;
	error: string;
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

function ValidationResult(errors: ValidationError[]): ValidationResult {
	return {
		success: errors.length === 0,
		message: '| ' + errors.map((err) => `${err.property} - ${err.error}`).join(' | ')
	};
}

// User data

export interface UserData {
	login?: string;
	password?: string;
}

export function validateUserData(userData: UserData): ValidationResult {
	const errors: ValidationError[] = [];

	// Login
	if (!userData.login) errors.push(ValidationError('login', 'is missing'));
	else if (userData.login.length < 2)
		errors.push(ValidationError('login', 'length should be min. 2 characters long'));
	else if (userData.login.length > 32)
		errors.push(ValidationError('login', 'length should be max. 32 characters long'));
	else if (userData.login.match(/[^\w\-\!\$\%\^\&\*\#\?\@]{1,}/gm) !== null)
		errors.push(
			ValidationError(
				'login',
				'has illegal characters. (Legal characters are a-z, A-Z, 0-9, !$&^*#?@.,:)'
			)
		);

	// Password
	if (!userData.password) errors.push(ValidationError('password', 'is missing'));
	else if (userData.password.length < 8)
		errors.push(ValidationError('password', 'length should be min. 2 characters long'));
	else if (userData.password.length > 32)
		errors.push(ValidationError('password', 'length should be max. 32 characters long'));
	else if (userData.password.match(/[^\w\-\!\$\%\^\&\*\#\?\@]{1,}/gm) !== null)
		errors.push(
			ValidationError(
				'password',
				'has illegal characters. (Legal characters are a-z, A-Z, 0-9, !$&^*#?@.,:)'
			)
		);

	return ValidationResult(errors);
}

// Author data
export interface AuthorData {
	name?: string;
}

export function validateAuthorData(authorData: AuthorData): ValidationResult {
	const errors: ValidationError[] = [];

	// Name
	if (!authorData.name) errors.push(ValidationError('name', 'is missing'));
	else if (authorData.name.length < 2)
		errors.push(ValidationError('name', 'length should be min. 2 characters long'));
	else if (authorData.name.length > 256)
		errors.push(ValidationError('name', 'length should be max. 256 characters long'));
	else if (authorData.name.match(/[^\w ]{1,}/gm) !== null)
		errors.push(
			ValidationError(
				'name',
				'has illegal characters. (Legal characters are a-z, A-Z, 0-9, _(underscore),  (space))'
			)
		);

	return ValidationResult(errors);
}

// Song data
export interface SongData {
	title?: string;
	authorId?: number;
	chords?: string;
	lyrics?: string;
}

export function validateSongData(songData: SongData): ValidationResult {
	const errors: ValidationError[] = [];

	// Title
	if (!songData.title) errors.push(ValidationError('title', 'is missing'));
	else if (songData.title.length < 2)
		errors.push(ValidationError('title', 'length should be min. 2 characters long'));
	else if (songData.title.length > 256)
		errors.push(ValidationError('title', 'length should be max. 256 characters long'));
	else if (songData.title.match(/[^\w ]{1,}/gm) !== null)
		errors.push(
			ValidationError(
				'title',
				'has illegal characters. (Legal characters are a-z, A-Z, 0-9, _(underscore),  (space))'
			)
		);

	// AuthorId
	if (!songData.authorId) errors.push(ValidationError('authorId', 'is missing'));
	else if (Number.isInteger(songData.authorId)) ValidationError('authorId', 'is not integer');

	// Lyrics
	if (!songData.lyrics) errors.push(ValidationError('lyrics', 'are missing'));
	else if (songData.lyrics.match(/[^\w\s\,\.\"\'\;\:\(\)\[\]\{\}\!\?\/\\\-]{1,}/gm) !== null)
		errors.push(
			ValidationError(
				'lyrics',
				'has illegal characters. (Legal characters are a-z, A-Z, 0-9, _-,."\';:()[]{}!?/\\ , (whitespace characters))'
			)
		);

	// Chords
	if (!songData.chords) errors.push(ValidationError('chords', 'are missing'));
	else if (songData.chords.match(/[^\w\s\:\(\)\/\\\-]{1,}/gm) !== null)
		errors.push(
			ValidationError(
				'chords',
				'has illegal characters. (Legal characters are a-z, A-Z, 0-9, _-:()/\\ , (whitespace characters))'
			)
		);

	return ValidationResult(errors);
}
