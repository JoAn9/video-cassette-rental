import React from 'react';
import { shallow } from 'enzyme';
import NavBar from './NavBar';

test('`chat` button is visible for loggedIn', () => {
  const wrapper = shallow(<NavBar loggedIn={true} />);
  const chatMenuButton = wrapper.find('[data-test="chat-button"]');
  expect(chatMenuButton.length).toBe(1);
});

test('`chat` button is not visible for not loggedIn', () => {
  const wrapper = shallow(<NavBar loggedIn={false} />);
  const chatMenuButton = wrapper.find('[data-test="chat-button"]');
  expect(chatMenuButton.length).toBe(0);
});

test('`post movie` button is visible for loggedIn', () => {
  const wrapper = shallow(<NavBar loggedIn={true} />);
  const postmovieMenuButton = wrapper.find('[data-test="post-movie-button"]');
  expect(postmovieMenuButton.length).toBe(1);
});

test('`post movie` button is not visible for not loggedIn', () => {
  const wrapper = shallow(<NavBar loggedIn={false} />);
  const postmovieMenuButton = wrapper.find('[data-test="post-movie-button"]');
  expect(postmovieMenuButton.length).toBe(0);
});
