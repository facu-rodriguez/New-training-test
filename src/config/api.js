import { create } from 'apisauce';

const api = create({
  baseURL: 'https://private-2d0994-trainingfront.apiary-mock.com',
  timeout: 30000
});

export default api;
