import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import MovieDetail from './MovieDetail';
import { movieQuery } from './graphql/moviesRequests';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    movieId: 'r1zKdmOmv',
  }),
}));

const mockMovie = {
  request: {
    query: movieQuery,
    variables: { id: 'r1zKdmOmv' },
  },
  result: {
    data: {
      movie: {
        __typename: 'Movie',
        id: 'r1zKdmOmv',
        title: 'Rambo: Last Blood',
        actor: {
          id: 'S16EZxQQD',
          name: 'Sylvester Stallone',
        },
        description:
          'John Rambo częściej niż po broń sięga dziś po butelkę. Szuka w niej ucieczki przed powracającymi wspomnieniami dawnych walk i utraconych bliskich. Gdy jednak uprowadzona zostaje córka jego przyjaciółki, John po raz ostatni będzie musiał stanąć do walki. Wkrótce okaże się, że porywacze pracują dla mafii, która z porwań młodych kobiet zrobiła dochodowy biznes. Próba ocalenia dziewczyny oznacza wypowiedzenie wojny armii bezwzględnych najemników. A wojna to żywioł Johna Rambo. Gdy jego przeciwnicy zrozumieją, że najtrudniejszym przeciwnikiem jest ten, który nie ma nic do stracenia, nie będzie już dla nikogo odwrotu. Okazywanie litości nie jest najmocniejszą stroną John Rambo. Oni pierwsi przelali krew. On zrobi to ostatni.',
      },
    },
  },
};

describe('MovieDetail', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <MockedProvider mocks={[mockMovie]}>
          <MovieDetail />
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

    const component = wrapper.find('[data-test="movie-component"]');
    expect(component.text()).toContain(
      'John Rambo częściej niż po broń sięga dziś po butelkę.'
    );
  });
});

test('error message is displayed when error', async () => {
  const errorMock = {
    request: {
      query: movieQuery,
      variables: { id: 'r1zKdmOmv' },
    },
    error: new Error('serious error'),
  };

  const wrapper = mount(
    <MemoryRouter>
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <MovieDetail />
      </MockedProvider>
    </MemoryRouter>
  );
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    wrapper.update();
  });
  expect(wrapper.text()).toBe('Some error occurs: serious error');
});
