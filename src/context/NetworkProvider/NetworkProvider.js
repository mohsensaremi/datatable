import React from 'react';
import PropTypes from 'prop-types';
import {NetworkContext} from '../index';
import pick from "lodash/pick";
import omit from "lodash/omit";
import {shallowEqual} from 'recompose';

class NetworkProvider extends React.Component {

    initialState;

    state = {
        data: this.props.data || null,
        total: this.props.total || null,
        loading: this.props.loading || false,
        request: this.request.bind(this),
        setQuery: this.setQuery.bind(this),
        unsetQuery: this.unsetQuery.bind(this),
        onReset: this.onReset.bind(this),
        error: null,
        hasMore: true,
    };

    componentDidMount() {
        this.initialState = pick(this.state, [
            'data',
            'total',
            'loading',
        ]);
        if (this.props.requestOnMount) {
            this.request();
        }
    }

    onReset() {
        this.setState(this.initialState);
    }

    setQuery(query) {
        this.setState({
            query,
        });
    }

    unsetQuery() {
        this.setState(state => omit(state, ['query']));
    }

    request() {
        this.setState({
            loading: true,
        });

        const settings = {
            ...pick(this.props.settings, ['orderBy', 'order', 'skip', 'limit', 'search']),
            ...this.props.query,
            ...this.state.query,
        };
        const {
            forwardPaging,
            backwardPaging,
            searchState,
        } = this.props.settings;

        return this.props.network(settings)
            .then(({data, total}) => {
                this.setState(state => {
                    const hasMore= data.length > 0;
                    if (!searchState) {
                        if (forwardPaging) {
                            data = [...(state.data || []), ...data];
                        }
                        if (backwardPaging) {
                            data = [...data, ...(state.data || [])];
                        }
                    }
                    return {
                        data,
                        total,
                        loading: false,
                        hasMore,
                    }
                });
            }).catch(e => {
                this.setState({
                    error: e,
                    loading: false,
                });
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.settings.orderBy !== prevProps.settings.orderBy ||
            this.props.settings.order !== prevProps.settings.order ||
            this.props.settings.skip !== prevProps.settings.skip ||
            this.props.settings.limit !== prevProps.settings.limit ||
            this.props.settings.search !== prevProps.settings.search ||
            !shallowEqual(prevProps.query, this.props.query) ||
            !shallowEqual(prevState.query, this.state.query)
        ) {
            this.request();
        }
    }

    render() {

        return (
            <NetworkContext.Provider value={this.state}>
                {this.props.children}
            </NetworkContext.Provider>
        );
    }
}

NetworkProvider.defaultProps = {
    network: () => Promise.resolve({data: [], total: 0}),
    requestOnMount: true,
};

NetworkProvider.propTypes = {
    requestOnMount: PropTypes.bool.isRequired,
    network: PropTypes.func.isRequired,
};

export default NetworkProvider;
