import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import MovieBoard from './MovieBoard';
import { moviesQuery } from './graphql/moviesRequests';

const mocks = [
  {
    request: {
      query: moviesQuery,
    },
    result: {
      data: {
        movies: [
          {
            id: 'ByENcx7mD',
            title: 'Good Will Hunting',
            actor: {
              id: 'rJ8MQlmmv',
              name: 'Matt Damon',
            },
          },
          {
            id: 'Sy0LyZ7Xv',
            title: 'The Departed',
            actor: {
              id: 'rJ8MQlmmv',
              name: 'Matt Damon',
            },
          },
          {
            id: 'ry5TJbmmP',
            title: 'Contagion',
            actor: {
              id: 'rJ8MQlmmv',
              name: 'Matt Damon',
            },
          },
        ],
      },
    },
  },
];

describe('MovieBoard', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MovieBoard />
        </MockedProvider>
      </MemoryRouter>
    );
  });

  test('`loading...` text is displayed while fetching data', () => {
    expect(wrapper.text()).toContain('Loading...');
  });

  test('renders movies list after receiving data', async () => {
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      wrapper.update();
    });

    const movieElement = wrapper.find('div.media-content');

    expect(movieElement.at(0).text()).toContain(
      'Good Will Hunting with Matt Damon'
    );
    expect(movieElement.at(1).text()).toContain('The Departed with Matt Damon');
    expect(movieElement.at(2).text()).toContain('Contagion with Matt Damon');

    expect(movieElement.children().length).toBe(3);
  });
});

test('error message is displayed when error', async () => {
  const errorMock = {
    request: {
      query: moviesQuery,
    },
    error: new Error('serious error'),
  };

  const wrapper = mount(
    <MemoryRouter>
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <MovieBoard />
      </MockedProvider>
    </MemoryRouter>
  );
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    wrapper.update();
  });

  expect(wrapper.text()).toBe('Some error occurs: serious error');
});
