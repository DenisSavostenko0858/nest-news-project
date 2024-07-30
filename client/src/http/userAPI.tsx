import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (name:string, email: string, password: string): Promise<any> => {
  const { data } = await $host.post('api/users/register', {name, email, password, role: 'user' });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};
  
export const login = async (email: string, password: string): Promise<any> => {
  const { data } = await $host.post('api/users/login', { email, password });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};
  
export const check = async (): Promise<any> => {
  const { data } = await $authHost.get('api/users/auth');
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const logout = (): void => {
  localStorage.removeItem('token');
};