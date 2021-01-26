require('dotenv').config();

const config = {};

config.apiUrl = process.env.API_BASE_PATH || 'http://localhost:8001';

module.exports = config;
