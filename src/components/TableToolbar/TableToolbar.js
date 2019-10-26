import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import SearchInput from '../SearchInput';

const TableToolbar = (props) => {

    const {
        action1,
    } = props;

    return (
        <Toolbar>
            <Grid container spacing={2} justify={"space-between"} alignItems={"center"}>
                <Grid item>
                    {action1}
                </Grid>
                <Grid item>
                    <SearchInput/>
                </Grid>
            </Grid>
        </Toolbar>
    );
};

export default TableToolbar;
