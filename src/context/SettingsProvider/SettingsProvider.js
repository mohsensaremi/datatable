import React from 'react';
import {SettingsContext} from '../index';
import debounce from 'lodash/debounce';

class SettingsProvider extends React.Component {

    state = {
        orderBy: this.props.orderBy || '_id',
        order: this.props.order || 'desc',
        skip: this.props.skip || 0,
        limit: this.props.limit || 25,
        search: '',
        searchInput: '',
        // forwardPaging: false,
        // backwardPaging: false,
        // searchState: false,

        onNextPage: this.onNextPage.bind(this),
        onPrevPage: this.onPrevPage.bind(this),
        onChangePage: this.onChangePage.bind(this),
        onChangeRowsPerPage: this.onChangeRowsPerPage.bind(this),
        onClickSort: this.onClickSort.bind(this),
        onChangeSearch: this.onChangeSearch.bind(this),
        onChangeSearchInput: this.onChangeSearchInput.bind(this),
    };

    onNextPage() {
        this.setState(state => ({
            skip: state.skip + state.limit,
            forwardPaging: true,
        }));
    }

    onPrevPage() {
        this.setState(state => ({
            skip: state.skip - state.limit,
            backwardPaging: true,
        }));
    }

    onChangePage(event, page) {
        this.setState(state => ({skip: page * state.limit}));
    }

    onChangeRowsPerPage(event) {
        this.setState({limit: event.target.value});
    }

    onClickSort(property) {
        const orderBy = property;

        this.setState(state => {
            let order = 'desc';

            if (state.orderBy === property && state.order === 'desc') {
                order = 'asc';
            }

            return {order, orderBy}
        });
    }

    onChangeSearch(e) {
        this.setState({
            search: e.target.value,
        });
    }

    onChangeSearchDebounced = debounce((e) => {
        this.setState({
            search: e.target.value,
        });
    }, 500);

    onChangeSearchInput(e) {
        const value = e.target.value;
        this.setState({
            searchInput: value,
        }, () => {
            this.onChangeSearchDebounced({target: {value: value}});
        });
    }

    render() {

        return (
            <SettingsContext.Provider value={this.state}>
                {this.props.children}
            </SettingsContext.Provider>
        );
    }
}

export default SettingsProvider;
