import React, {Component} from 'react';
import { Route, Link } from "react-router-dom";

import Constants from '../Common/constants';
import Header from '../Header/Header';
import SearchResults from '../Search/SearchResults';

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            titleActive: true,
            sortByReleaseDate: true,
            searchText: ''
        };
        this.titleClick = this.titleClick.bind(this);
        this.genreClick = this.genreClick.bind(this);
        this.searchClick = this.searchClick.bind(this);
        this.releaseDateClick = this.releaseDateClick.bind(this);
        this.ratingClick = this.ratingClick.bind(this);
        this.valueChangeHandler = this.valueChangeHandler.bind(this);
    }
    refreshSearchResults() {
        let titleOrGenre = (this.state.titleActive === true) ? 'title' : 'genres';
        let dateOrVote = (this.state.sortByReleaseDate === true) ? 'release_date' : 'vote_average';
        let urlStr = `${Constants.baseURL}?search=${this.state.searchText}&searchBy=${titleOrGenre}&sortBy=${dateOrVote}&sortOrder=desc`;
        fetch(urlStr)
            .then(res => res.json())
            .then(response => {
                this.setState({
                    movies: response.data
                });
            });
    }
    searchClick() {
        this.refreshSearchResults();
    }
    titleClick() {
        this.setState({ titleActive: true });
    }
    genreClick() {
        this.setState({ titleActive: false });
    }
    releaseDateClick() {
        this.setState({ sortByReleaseDate: true }, () => {
            this.refreshSearchResults();
        });
    }
    ratingClick() {
        this.setState({ sortByReleaseDate: false }, () => {
            this.refreshSearchResults();
        });
    }
    valueChangeHandler(e) {
        this.setState({
            searchText: e.target.value
        });
    }
    render() {
        return (
            <div>
                <Header showSearchButton={false}
                    titleActive={this.state.titleActive}
                    value={this.state.searchText}
                    valueChangeHandler={this.valueChangeHandler}
                    titleClick={this.titleClick}
                    genreClick={this.genreClick}
                    searchClick={this.searchClick} />
                <SearchResults movies={this.state.movies}
                    releaseDate={this.state.sortByReleaseDate}
                    releaseDateClick={this.releaseDateClick}
                    ratingClick={this.ratingClick} />
            </div>
        );
    }
}
