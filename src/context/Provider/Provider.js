import React from 'react';
import {SettingsContext} from '../index';
import NetworkProvider from '../NetworkProvider';
import SettingsProvider from '../SettingsProvider';

function Provider(props) {

    const {
        settingsProps,
        networkProps,
        url,
        children,
    } = props;

    return (
        <SettingsProvider {...settingsProps}>
            <SettingsContext.Consumer>
                {
                    settings => (
                        <NetworkProvider
                            settings={settings}
                            {...networkProps}
                            url={url}
                        >
                            {children}
                        </NetworkProvider>
                    )
                }
            </SettingsContext.Consumer>
        </SettingsProvider>
    );
}

export default Provider;
