import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import MovieForm from './MovieForm';
import { createMovieMutation, actorsQuery } from './graphql/moviesRequests';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const title = 'Nowy film z SStallonem';
const description = 'fajny film';
const actor = {
  id: 'S16EZxQQD',
  name: 'Sylvester Stallone',
};
const movieId = 'BkrRD2iBD';
let createMovieMutationCalled = false;

const mocks = [
  {
    request: {
      query: createMovieMutation,
      variables: {
        input: {
          title,
          actorId: actor.id,
          description,
        },
      },
    },
    result: () => {
      createMovieMutationCalled = true;
      return {
        data: {
          movie: {
            __typename: 'Movie',
            id: movieId,
            title,
            actor,
            description,
          },
        },
      };
    },
  },
  {
    request: {
      query: actorsQuery,
    },
    result: {
      data: {
        actors: [
          actor,
          {
            id: 'HyIapOt7w',
            name: 'Gwyneth Paltrow',
          },
          {
            id: 'ryiOAuK7P',
            name: 'Penélope Cruz',
          },
        ],
      },
    },
  },
];

describe('MovieForm', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <MockedProvider mocks={mocks}>
          <MovieForm />
        </MockedProvider>
      </MemoryRouter>
    );
  });

  test('component renders without errors', () => {
    expect(wrapper.find(MovieForm)).toBeTruthy();
    expect(wrapper.find(MovieForm).length).toBe(1);
  });

  test('should display `loading...` text while fetching data for select field', () => {
    expect(wrapper.text()).toContain('Loading...');
  });

  test('should presents form after receiving data', async () => {
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      wrapper.update();
    });

    const fieldActors = wrapper.find('[data-test="field-actors"]');
    const fieldTitle = wrapper.find('[data-test="field-title"]');
    const fieldDescription = wrapper.find('[data-test="field-description"]');

    expect(fieldActors.text()).toContain('Choose Actor');
    expect(fieldTitle.text()).toContain('Title');
    expect(fieldDescription.text()).toContain('Description');
  });
});

describe('submitting MovieForm', () => {
  let wrapper;
  beforeEach(async () => {
    wrapper = mount(
      <MemoryRouter>
        <MockedProvider mocks={mocks}>
          <MovieForm />
        </MockedProvider>
      </MemoryRouter>
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      wrapper.update();
    });

    const inputTitle = wrapper.find('[type="text"]');
    inputTitle.simulate('change', { target: { value: title } });
    const actorField = wrapper.find('select');
    actorField.simulate('change', { target: { value: actor.name } });
    const descriptionField = wrapper.find('textarea');
    descriptionField.simulate('change', { target: { value: description } });
    const submitButton = wrapper.find('[type="submit"]');

    await act(async () => {
      submitButton.simulate('submit', { preventDefault() {} });
      await new Promise(resolve => setTimeout(resolve, 0));
      wrapper.update();
    });
  });

  test('should called `createMovieMutation`', () => {
    expect(createMovieMutationCalled).toBe(true);
  });

  test('should display `loading` after clicking submit button', async () => {
    expect(wrapper.text()).toContain('Loading...');
  });

  test('should push to a page with a new movie', async () => {
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      wrapper.update();
    });
    expect(mockHistoryPush).toHaveBeenCalled();
    expect(mockHistoryPush).toHaveBeenCalledWith(`/movies/${movieId}`);
  });
});
