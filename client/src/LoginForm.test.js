import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';
import auth from './utils/auth';

const mockLogin = jest.fn();
auth.login = mockLogin;

test('click on login button triggers login function', () => {
  const wrapper = shallow(<LoginForm />);
  const loginButton = wrapper.find('[data-test="login-button"]');
  loginButton.simulate('click', { preventDefault() {} });
  expect(mockLogin).toHaveBeenCalledTimes(1);
});
