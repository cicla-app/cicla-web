import http from './BaseService';

const login = (user) => http.post('/login', user)
  .then(response => response.data);

const register = (user) => http.post('/users', user)
  .then(response => response.data);

const logout = (user) => http.post('/logout')
  .then(response => response.data);

export default {
  login,
  register,
  logout
}