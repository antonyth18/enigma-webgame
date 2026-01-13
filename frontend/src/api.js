export const API_URL = 'http://localhost:3000/api';

export const api = {
    async post(endpoint, data, token) {
        const headers = { 'Content-Type': 'application/json' };
        const authToken = token || localStorage.getItem('token');
        if (authToken) headers['Authorization'] = `Bearer ${authToken}`;

        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'API Error');
        return json;
    },

    async get(endpoint, token) {
        const headers = {};
        const authToken = token || localStorage.getItem('token');
        if (authToken) headers['Authorization'] = `Bearer ${authToken}`;

        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'GET',
            headers,
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'API Error');
        return json;
    }
};
