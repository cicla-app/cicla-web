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
  .then(response => console.log(response.data)
  )

const onUserChange = () => user$.asObservable();

export default {
  login,
  register,
  logout,
  onUserChange,
  updateUser
}