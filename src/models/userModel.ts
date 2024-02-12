import { v4 as uuidv4 } from 'uuid';
import { User } from '../shared/typings';

let users: User[] = [
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
];

function getAllUsers(): User[] {
  return users;
}

function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}

function createUser(user: Omit<User, 'id'>): User {
  const newUser = { ...user, id: uuidv4() };
  users.push(newUser);
  return newUser;
}

function editUser(
  id: string,
  newUserInfo: Omit<User, 'id'>,
): User {
  const userIndex = users.findIndex((user) => user.id === id);
  users[userIndex] = { id, ...newUserInfo };
  return users[userIndex];
}

function removeUser(id: string): User[] {
  users = users.filter((user) => user.id !== id);
  return users;
}

export { getAllUsers, getUserById, createUser, editUser, removeUser };