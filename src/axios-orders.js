import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-burger-app-veneta.firebaseio.com/'
});

export default instance;