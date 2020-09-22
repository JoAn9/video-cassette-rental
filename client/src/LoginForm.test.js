import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';
import { login } from './utils/auth';

jest.mock('./utils/auth', () => {
  return {
    login: jest.fn().mockImplementation(() => 'verycomplicatedtoken'),
  };
});

let wrapper;
let loginButton;
let mockSetInput = jest.fn();
const props = { onLogin: jest.fn() };

beforeEach(() => {
  mockSetInput.mockClear();
  React.useState = jest.fn(() => [
    { email: '', password: '', error: false },
    mockSetInput,
  ]);
  wrapper = shallow(<LoginForm {...props} />);
  loginButton = wrapper.find('[data-test="login-button"]');
});

test('LoginForm renders without errors', () => {
  const component = wrapper.find('[data-test="form-component"]');

  expect(component.length).toBe(1);
  expect(component).toBeTruthy();
});

test('click on login button calls login function', () => {
  loginButton.simulate('click', { preventDefault() {} });

  expect(login).toHaveBeenCalledTimes(1);
  expect(login).toHaveBeenCalledWith('', '');
});

test('error message is not dispalyed when error is false', () => {
  loginButton.simulate('click', { preventDefault() {} });
  const errorElement = wrapper.find('[data-test="error-element"]');

  expect(errorElement.text()).toBe('');
});

test('error message is dispalyed when error is true', () => {
  mockSetInput.mockClear();
  React.useState = jest.fn(() => [
    { email: '', password: '', error: true },
    mockSetInput,
  ]);
  const customWrapper = shallow(<LoginForm {...props} />);
  const errorElement = customWrapper.find('[data-test="error-element"]');
  loginButton.simulate('click', { preventDefault() {} });

  expect(errorElement.text()).toContain('Invalid credentials');
});
