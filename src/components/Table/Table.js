import React from 'react';
import MuiTable from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TableHead from '../TableHead';
import TableBody from '../TableBody';
import {SettingsContext, NetworkContext} from "../../context";

const TablePaginationActions = (props) => {
    const style = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    };
    const totalPages = Math.ceil(props.count / props.rowsPerPage);

    const loadingJsx = (

        <Grid
            container
            alignItems={"center"}
            justify={"center"}
            style={style}
        >
            <CircularProgress
                size={16}
            />
        </Grid>
    );

    return (
        <NetworkContext.Consumer>
            {
                ({loading}) => (
                    <div className={props.className}>
                        <IconButton
                            disabled={props.page === 0 || loading}
                            onClick={event => props.onChangePage(event, props.page - 1)}
                        >
                            <ChevronRightIcon
                                {...props.backIconButtonProps}
                            />
                            {loading && loadingJsx}
                        </IconButton>
                        <IconButton
                            disabled={props.page >= totalPages - 1 || loading}
                            onClick={event => props.onChangePage(event, props.page + 1)}
                        >
                            <ChevronLeftIcon
                                {...props.nextIconButtonProps}
                            />
                            {loading && loadingJsx}
                        </IconButton>
                    </div>
                )
            }
        </NetworkContext.Consumer>
    );
};

const Table = (props) => {

    const {
        classes,
        columns,
        tableHeadProps,
        tableBodyProps,
        id,
        disableMinWidth,
    } = props;

    return (
        <div className={classes.root}>
            <div className={classes.tableWrapper}>
                <MuiTable className={`${classes.table} ${disableMinWidth ? classes.disableMinWidth : ""}`} id={id}>
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
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    )
                                }
                            }
                        </NetworkContext.Consumer>
                    )
                }
            </SettingsContext.Consumer>
        </div>
    );
};

export default Table;
