
import { API_BASE_PATH } from '../src/constants/constants';
import { config } from 'dotenv';
import { validate } from 'uuid';
config();

const baseUrl = `http://localhost:${process.env.PORT}`;

describe('API TEST GET', () => {
	test('GET api/users should return an array of users', async () => {
		console.log(`${baseUrl}${API_BASE_PATH}`)
		const response = await fetch(`${baseUrl}${API_BASE_PATH}`);
		const users = await response.json();

		expect(response.status).toBe(200);
		expect(users).toEqual([
			{
				id: '58da9d8b-9fa8-46de-ad22-0a51c55d1b44',
				username: 'Name 1',
				age: 20,
				hobbies: [],
			},
			{
				id: '8920a51f-9852-40fe-8443-f09e4f53ee1e',
				username: 'Name 2',
				age: 30,
				hobbies: ['hobby 1', 'hobby 2'],
			},
			{
				id: '7e449bcc-e139-4008-8e6a-e3f873c44dbe',
				username: 'Name 3',
				age: 40,
				hobbies: ['hobby 1', 'hobby 2', 'hobby 3'],
			},
		]);
	});
});

describe('API TEST GET', () => {
	test('GET api/users/:id should return a single user by id', async () => {
		const id = '58da9d8b-9fa8-46de-ad22-0a51c55d1b44';

		const response = await fetch(`${baseUrl}${API_BASE_PATH}/${id}`);
		const user = await response.json();

		expect(response.status).toBe(200);
		expect(user.id).toBe(id);
	});
});

describe('API TEST POST', () => {
	test('POST api/users should create a new user and return it', async () => {
		const mockUser = {
			username: 'Name Test',
			age: 25,
			hobbies: ['hobby 1', 'hobby 2'],
		};

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(mockUser),
		};

		const response = await fetch(`${baseUrl}${API_BASE_PATH}`, options);
		const user = await response.json();

		expect(response.status).toBe(201);
		expect(validate(user.id)).toBe(true);
		expect(user.username).toEqual(mockUser.username);
		expect(user.age).toEqual(mockUser.age);
		expect(user.hobbies).toEqual(mockUser.hobbies);
	});
});

describe('API TEST PUT', () => {
	test('PUT api/users/:id should update user and return it', async () => {
		const mockUser = {
			username: 'User Update',
			age: 30,
			hobbies: ['hobby 1'],
		};

		const id = '8920a51f-9852-40fe-8443-f09e4f53ee1e';

		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(mockUser),
		};

		const response = await fetch(`${baseUrl}${API_BASE_PATH}/${id}`, options);
		const user = await response.json();

		expect(response.status).toBe(200);
		expect(user.username).toBe(mockUser.username);
		expect(user.age).toBe(mockUser.age);
		expect(user.hobbies).toEqual(mockUser.hobbies);
	});
});

describe('API TEST DELETE', () => {
	test('DELETE api/users/:id should delete user', async () => {
		const id = '7e449bcc-e139-4008-8e6a-e3f873c44dbe';
		const options = {
			method: 'DELETE',
		};

		const response = await fetch(`${baseUrl}${API_BASE_PATH}/${id}`, options);
		expect(response.status).toBe(204);
	});
});