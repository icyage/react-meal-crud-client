import config from '../config';
import { fetchData } from './utils.service';

const headers = {
    'Content-Type': 'application/json',
};

class UserService {
    static createUser(token, newUser) {
        return fetchData(fetch(`${config.apiUrl}/users`, {
            method: 'POST',
            headers: {
                ...headers,
                Authorization: token,
            },
            body: JSON.stringify(newUser),
        }));
    }

    static readUsers(token) {
        return fetchData(fetch(`${config.apiUrl}/users`, {
            method: 'GET',
            headers: {
                ...headers,
                Authorization: token,
            },
        }));
    }

    static updateUser(token, userId, data) {
        return fetchData(fetch(`${config.apiUrl}/users/${userId}`, {
            method: 'PUT',
            headers: {
                ...headers,
                Authorization: token,
            },
            body: JSON.stringify(data),
        }));
    }

    static deleteUser(token, userId) {
        return fetchData(fetch(`${config.apiUrl}/users/${userId}`, {
            method: 'DELETE',
            headers: {
                ...headers,
                Authorization: token,
            },
        }));
    }

    static self(token) {
        return fetchData(fetch(`${config.apiUrl}/users/self`, {
            method: 'GET',
            headers: {
                ...headers,
                Authorization: token,
            },
        }));
    }

    static login(authData) {
        return fetchData(fetch(`${config.apiUrl}/users/login`, {
            method: 'POST',
            headers: {
                ...headers,
            },
            body: JSON.stringify(authData)
        }));
    }

    static register(newUser) {
        return fetchData(fetch(`${config.apiUrl}/users/register`, {
            method: 'POST',
            headers: {
                ...headers,
            },
            body: JSON.stringify(newUser)
        }));
    }
}

export default UserService;