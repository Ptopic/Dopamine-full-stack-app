import axios from 'axios';

const client = axios.create({
	baseURL: 'http://192.168.1.110:3001/api',
});

export default client;
