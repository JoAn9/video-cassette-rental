// NOTE: this example keeps the access token in LocalStorage
// In a real application use cookies instead for better security (e.g. "http only" cookies)
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
  try {
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const { token } = await response.json();
    localStorage.setItem(accessTokenKey, token);
    return token;
  } catch (error) {
    return null;
  }
}

export function isLoggedIn() {
  return !!getAccessToken();
}

export function logout() {
  localStorage.removeItem(accessTokenKey);
}
