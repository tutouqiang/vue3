import axion from 'axios';

const req = axion.create({
  baseURL: 'http://localhost:3000',
})

export default req