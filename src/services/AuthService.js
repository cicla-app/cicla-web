import http from './BaseService';
import { BehaviorSubject } from 'rxjs';

const CURRENT_USER_KEY = 'current-user';

let user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || '{}')
const user$ = new BehaviorSubject(user);

const login = (user) => http.post('/login', user)
  .then(response => {
    user = response.data;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  });

const register = (user) => http.post('/users', user)
  .then(response => {
    user = response.data;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  });

const logout = () => http.get('/logout')
  .then(response => {
    user = {};
    localStorage.removeItem(CURRENT_USER_KEY);
    return response.data
  });

const updateUser = (newUser) => http.put(`/users/${newUser.id}`, newUser)
  .then(response => response.data)
  
const getUser = (id) => http.get(`/users/${id}`)
  .then(response => response.data
  )

const deleteUser = (id) => http.delete(`/users/${id}`)
  .then(response => {
    user = {};
    localStorage.removeItem(CURRENT_USER_KEY);
    return response.data
  }
);

const onUserChange = () => user$.asObservable();

const createPeriod = (id, startPeriod) => {
  return http.post(`/periods/${id}`, {id, startPeriod})
    .then(response => response.data)
} 

const getPeriod = (id) => {
  return http.get(`/periods/${id}`)
    .then(response => response.data)
}

export default {
  login,
  register,
  logout,
  onUserChange,
  updateUser,
  getUser,
  createPeriod,
  getPeriod,
  deleteUser
}