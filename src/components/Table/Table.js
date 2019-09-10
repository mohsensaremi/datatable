import React from 'react';
import MuiTable from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import TableHead from '../TableHead';
import TableBody from '../TableBody';
import {SettingsContext, NetworkContext} from "../../context";

const Table = (props) => {

    const {
        classes,
        columns,
        tableHeadProps,
        tableBodyProps,
    } = props;


    return (
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
                <MuiTable className={classes.table}>
                    <TableHead
                        columns={columns}
                        {...tableHeadProps}
                    />
                    <TableBody
                        columns={columns}
                        {...tableBodyProps}
                    />
                </MuiTable>
            </div>
            <SettingsContext.Consumer>
                {
                    ({onChangePage, onChangeRowsPerPage, limit, skip}) => (
                        <NetworkContext.Consumer>
                            {
                                ({total}) => {
                                    const page = Math.floor(skip / limit);
                                    return (
                                        <TablePagination
                                            rowsPerPageOptions={[5, 25, 50, 100]}
                                            component="div"
                                            count={total}
                                            rowsPerPage={limit}
                                            page={page}
                                            backIconButtonProps={{
                                                'aria-label': 'Previous Page',
                                            }}
                                            nextIconButtonProps={{
                                                'aria-label': 'Next Page',
                                            }}
                                            onChangePage={onChangePage}
                                            onChangeRowsPerPage={onChangeRowsPerPage}
                                        />
                                    )
                                }
                            }
                        </NetworkContext.Consumer>
                    )
                }
            </SettingsContext.Consumer>
        </Paper>
    );
};

export default Table;
