import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

test('App renders without error', () => {
  const wrapper = shallow(<App />);
  const component = wrapper.find('[data-test="app-component"]');
  expect(component.length).toBe(1);
});
