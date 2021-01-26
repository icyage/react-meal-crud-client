import config from '../config';
import { fetchData } from './utils.service';

const headers = {
    'Content-Type': 'application/json',
};

class MealService {
    static createMeal(token, newMeal) {
        return fetchData(fetch(`${config.apiUrl}/meals`, {
            method: 'POST',
            headers: {
                ...headers,
                Authorization: token,
            },
            body: JSON.stringify(newMeal),
        }));
    }

    static readMeals(token, filter) {
        return fetchData(fetch(`${config.apiUrl}/meals/read`, {
            method: 'POST',
            headers: {
                ...headers,
                Authorization: token,
            },
            body: JSON.stringify(filter),
        }));
    }

    static updateMeal(token, mealId, data) {
        return fetchData(fetch(`${config.apiUrl}/meals/${mealId}`, {
            method: 'PUT',
            headers: {
                ...headers,
                Authorization: token,
            },
            body: JSON.stringify(data),
        }));
    }

    static deleteMeal(token, mealId) {
        return fetchData(fetch(`${config.apiUrl}/meals/${mealId}`, {
            method: 'DELETE',
            headers: {
                ...headers,
                Authorization: token,
            },
        }));
    }
}

export default MealService;