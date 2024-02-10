import { User } from '../shared/typings';

export function validateUserFields(body: User): boolean {
	const { username, age, hobbies } = body;

	const isValid =
		// username validation
		username && typeof username === 'string' && username.trim() !== '' &&
		// age validation
		age && typeof age === 'number' && Number.isInteger(age) && age > 0 &&
		// hobbies validation
		hobbies && Array.isArray(hobbies) && hobbies.length > 0 &&
		hobbies.every((hobby) => typeof hobby === 'string' && hobby.trim() !== '');

	return Boolean(isValid);
}