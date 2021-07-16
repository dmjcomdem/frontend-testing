// @ts-check
import '@testing-library/jest-dom';
import nock from 'nock';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Autocomplete from '../src/Autocomplete.jsx';

/** variables **/
const host = 'http://localhost';
const searchCounters = [
    ['a', ['afghanistan', 'albania', 'algeria']],
    ['al', ['albania', 'algeria']],
    ['alb', ['albania']]
];

// BEGIN
describe('Autocomplete', () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  beforeEach(() => {
    searchCounters.forEach(([term, countries]) => {
      nock(host)
        .get('/countries')
        .query({ term })
        .reply(200, countries)
    })
  })

  describe.each(searchCounters)
    ('Отображние списка стран по вхожддению', (letter, countries) => {
      test(`символа ${letter} - ${countries}`, async () => {
        render(<Autocomplete />);
        userEvent.type(screen.getByRole('textbox'), letter);

        for await (let country of countries) {
          const pattern = new RegExp(country, 'i');
          await waitFor(() => expect(screen.queryByText(pattern)).toBeVisible());
        }
    })
  })

  test('Если очистить поле ввода, то список стран не выводится на страницу.', async () => {
    const { container } = render(<Autocomplete />);
    const input = screen.getByRole('textbox');

    userEvent.type(input, 'a');
    await waitFor(() => expect(screen.getByRole('list')).toBeInTheDocument());

    userEvent.clear(input);
    expect(container.querySelector('ul')).not.toBeInTheDocument();
  })
})
// END
