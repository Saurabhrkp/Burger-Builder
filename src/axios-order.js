import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sunlit-cyclist-260912.firebaseio.com/'
});

export default instance;
