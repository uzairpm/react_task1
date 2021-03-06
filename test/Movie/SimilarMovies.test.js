import { shallow } from 'enzyme';
import React from 'react';

import SimilarMovies from '../../src/components/Movie/SimilarMovies';

describe('SimilarMovies Component', () => {
    let element;
    beforeAll(() => {
        const moviesArray = [{
            id: 101,
            poster_path: '',
            title: 'Feel Good',
            vote_average: 8,
            genres: ['Action', 'Drama'],
            release_date: '2017-10-10',
            runtime: 108,
            overview: 'A feel good movie'
        }];
        element = shallow(<SimilarMovies genre="Action" movies={moviesArray}/>);
    })
    test('Snapshot test when moovies and genre are passed as props', () => {
        expect(element).toMatchSnapshot();
    });
});