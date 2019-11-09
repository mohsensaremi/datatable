import React from 'react';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import {SettingsContext, NetworkContext} from "../../context";

const SearchInput = (props) => {

    const {
        ...otherProps
    } = props;

    return (
        <SettingsContext.Consumer>
            {
                ({searchInput, onChangeSearchInput}) => (
                    <NetworkContext.Consumer>
                        {
                            ({loading}) => (
                                <TextField
                                    value={searchInput}
                                    onChange={onChangeSearchInput}
                                    label={"جستجو"}
                                    InputProps={{
                                        endAdornment: loading && (
                                            <CircularProgress size={20}/>
                                        ),
                                    }}
                                    {...otherProps}
                                />
                            )
                        }
                    </NetworkContext.Consumer>
                )
            }
        </SettingsContext.Consumer>
    );
};

export default SearchInput;
