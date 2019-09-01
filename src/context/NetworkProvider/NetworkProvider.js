import React from 'react';
import PropTypes from 'prop-types';
import {NetworkContext} from '../index';
import {buildQueryString} from "../../utils";
import pick from "lodash/pick";
import urlJoin from 'url-join';

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

        const s = {
            ...pick(this.props.settings, ['orderBy', 'order', 'skip', 'limit', 'search']),
            ...this.props.query,
        };

        if (this.props.settings.search && this.props.settings.searchColumns) {
            s.search = this.props.settings.search;
            s.searchColumns = this.props.settings.searchColumns.join('&searchColumns=');
        }

        const qs = buildQueryString(s);
        const requestUrl = urlJoin(this.props.url, `?${qs}`);

        return fetch(requestUrl, this.props.fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({
                    data: this.props.responseDataMapper(json),
                    total: this.props.responseTotalMapper(json),
                    loading: false,
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
            this.props.settings.search !== prevProps.settings.search
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
    responseDataMapper: json => json.data,
    responseTotalMapper: json => json.total,
    requestOnMount: true,
};

NetworkProvider.propTypes = {
    url: PropTypes.string.isRequired,
    requestOnMount: PropTypes.bool.isRequired,
    responseDataMapper: PropTypes.func.isRequired,
    responseTotalMapper: PropTypes.func.isRequired,
};

export default NetworkProvider;
