import { mockUsers } from './mockUsers';

export function login(username: string, password: string) {
  return mockUsers.some(u => u.username === username && u.password === password);
}
