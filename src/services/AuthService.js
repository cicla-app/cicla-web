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
  .then(response => response.data);

const logout = () => http.get('/logout')
  .then(response => {
    user = {};
    localStorage.removeItem(CURRENT_USER_KEY);
    return response.data
  });

const updateUser = (newUser) => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    user$.next(user);
  }

const onUserChange = () => user$.asObservable();

export default {
  login,
  register,
  logout,
  onUserChange,
  updateUser
}