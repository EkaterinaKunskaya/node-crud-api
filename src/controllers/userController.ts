import { IncomingMessage, ServerResponse } from 'http';
// MODEL FUNCTIONS
import {
	getAllUsers,
	getUserById,
	createUser,
	editUser,
	removeUser,
} from '../models/userModel';
// UTILS
import { bodyParser } from '../utils/bodyParser';
import { sendResponse } from '../utils/sendResponse';
import { validateUserFields } from '../utils/validateUserFields';
// TYPES
import { User } from '../shared/typings';


// @desc Get All Users
// @route GET /api/users
export async function getUsers(req: IncomingMessage, res: ServerResponse) {
	try {
		const users = await getAllUsers();
		sendResponse(res, 200, users);
	} catch (error) {
		console.log(error);
	}
}

// @desc Get User
// @route GET /api/users/:id
export async function getUser(
	req: IncomingMessage,
	res: ServerResponse,
	id: string,
) {
	try {
		const user = await getUserById(id);

		if (!user) {
			sendResponse(res, 404, { message: 'User don\'t exist' });
		} else {
			sendResponse(res, 200, user);
		}
	} catch (error) {
		console.log(error);
	}
}

// @desc Add User
// @route POST /api/users
export async function addUser(req: IncomingMessage, res: ServerResponse): Promise<void> {
	try {
		const body = await bodyParser(req) as User;
		const { username, age, hobbies } = body;
		const user: Omit<User, 'id'> = {
			username,
			age,
			hobbies,
		};

		const isValidUser = validateUserFields(body);

		if (!isValidUser) {
			sendResponse(res, 400, { message: 'Invalid user fields' });
			return;
		}

		const newUser: User = await createUser(user);
		sendResponse(res, 201, newUser);
	} catch (error) {
		console.log(error);
	}
}

// @desc Update User
// @route PUT /api/users/:id
export async function updateUser(
	req: IncomingMessage,
	res: ServerResponse,
	id: string,
): Promise<void> {
	try {
		const user = await getUserById(id);

		if (!user) {
			sendResponse(res, 404, { message: 'User don\'t exist' });
		} else {
			const body = await bodyParser(req) as User;
			const { username, age, hobbies } = body;
			const editableUserInfo = {
				username: username || user.username,
				age: age || user.age,
				hobbies: hobbies || user.hobbies,
			};

			const isValidUser = validateUserFields({id, ...editableUserInfo});

			if (!isValidUser) {
				sendResponse(res, 400, { message: 'Invalid user fields' });
				return;
			}

			const editableUser = await editUser(id, editableUserInfo);
			sendResponse(res, 200, editableUser);
		}
	} catch (error) {
		console.log(error);
	}
}

// @desc delete User
// @route DELETE /api/users/:id
export async function deleteUser(
	req: IncomingMessage,
	res: ServerResponse,
	id: string,
) {
	try {
		const user = await getUserById(id);
		console.log(user)
		if (!user) {
			sendResponse(res, 404, { message: 'User don\'t exist' });
		} else {
			await removeUser(id);
			console.log(id)
			console.log({ message: `User ${id} deleted` })

			sendResponse(res, 204, { message: `User ${id} deleted` });
		}
	} catch (error) {
		console.log(error);
	}
}