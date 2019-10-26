import React from 'react';
import PropTypes from 'prop-types';
import {NetworkContext} from '../index';
import pick from "lodash/pick";
import {shallowEqual} from 'recompose';

class NetworkProvider extends React.Component {

    state = {
        data: this.props.data || null,
        total: this.props.total || null,
        loading: this.props.loading || false,
        request: this.request.bind(this),
        error: null,
    };

    request() {
        this.setState({
            loading: true,
        });

        const settings = {
            ...pick(this.props.settings, ['orderBy', 'order', 'skip', 'limit', 'search']),
            ...this.props.query,
        };

        return this.props.network(settings)
            .then(({data, total}) => {
                this.setState(state => {
                    if (this.props.forwardPaging) {
                        data = [...(state.data || []), ...data];
                    }
                    if (this.props.backwardPaging) {
                        data = [...data, ...(state.data || [])];
                    }
                    return {
                        data,
                        total,
                        loading: false,
                    }
                });
            }).catch(e => {
                this.setState({
                    error: e,
                    loading: false,
                });
            });
    }

    componentDidMount() {
        if (this.props.requestOnMount) {
            this.request();
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.settings.orderBy !== prevProps.settings.orderBy ||
            this.props.settings.order !== prevProps.settings.order ||
            this.props.settings.skip !== prevProps.settings.skip ||
            this.props.settings.limit !== prevProps.settings.limit ||
            this.props.settings.search !== prevProps.settings.search ||
            !shallowEqual(prevProps.query, this.props.query)
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
