import { getAccessToken, getLoggedUser, login, logout } from './auth';

const accessTokenKey = 'accessToken';
const token =
  'e.eyJzdWIiOiJCSnJwLUR1ZFkiLCJuYW1lIjoiQm9iYnkiLCJpYXQiOjE2MDA0MTY4MzZ9.B';

const user = {
  sub: 'BJrp-DudY',
  name: 'Bobby',
  iat: 1600416836,
};

describe('test login function', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ token: '123' }),
    })
  );

  beforeEach(() => fetch.mockClear());

  test('login with fetch works', async () => {
    const mockedToken = await login();

    expect(mockedToken).toBe('123');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('login handles exception with null', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('Something went wrong'));

    const mockedToken = await login();

    expect(mockedToken).toBe(null);
    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    });
  });
});

describe('auth tests when user loggedIn', () => {
  beforeEach(() => {
    localStorage.setItem(accessTokenKey, token);
  });
  afterEach(() => {
    localStorage.removeItem(accessTokenKey);
  });

  test('`getAccessToken` returns token', () => {
    expect(getAccessToken()).toBe(token);
  });
  test('`getLoggedUser` returns logged user', () => {
    const expectedUser = getLoggedUser();
    expect(expectedUser).toEqual(user);
  });
  test('logout removes token', () => {
    logout();
    expect(getAccessToken()).toBe(null);
  });
});

test('`getLoggedUser` returns null when no token', () => {
  const expectedUser = getLoggedUser();
  expect(expectedUser).toBe(null);
});
