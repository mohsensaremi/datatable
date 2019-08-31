import React from 'react';
import {NetworkContext} from "../context";

export default (propName = "refreshDatatable") => (WrappedComponent) => {
    const DatatableWithRefresh = (props) => {
        return (
            <NetworkContext.Consumer>
                {
                    context => {

                        let extraProps = {
                            [propName]: context.request,
                        };

                        return (
                            <WrappedComponent
                                {...props}
                                {...extraProps}
                            />
                        );
                    }
                }
            </NetworkContext.Consumer>
        );
    };

    return DatatableWithRefresh;
};
