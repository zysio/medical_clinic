import axios from 'axios';

export default axios.create({
    baseURL: 'https://localhost:7047/api',
    headers: {"ngrok-skip-browser-warning": "true"}
});