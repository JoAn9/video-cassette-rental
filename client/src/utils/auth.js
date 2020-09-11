// NOTE: this example keeps the access token in LocalStorage
// In a real application you may want to use cookies instead for better security (e.g. "http only" cookies)
import jwtDecode from 'jwt-decode';

const accessTokenKey = 'accessToken';

export function getAccessToken() {
  return localStorage.getItem(accessTokenKey);
}

export function getLoggedUser() {
  const token = getAccessToken();
  if (!token) return null;
  const user = jwtDecode(token);
  return user;
}

export async function login(email, password) {
  const response = await fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem(accessTokenKey, token);
  }
  return response.ok;
}

export function isLoggedIn() {
  return !!getAccessToken();
}

export function logout() {
  localStorage.removeItem(accessTokenKey);
}
