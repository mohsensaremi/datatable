import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import {SettingsContext, NetworkContext} from "../../context";

const TableHead = (props) => {

    const {
        columns,
    } = props;

    return (
        <SettingsContext.Consumer>
            {
                ({order, orderBy, onClickSort}) => (
                    <NetworkContext.Consumer>
                        {
                            ({loading}) => (
                                <MuiTableHead>
                                    <TableRow>
                                        {columns.map(
                                            row => (
                                                <TableCell
                                                    key={row.name}
                                                    sortDirection={orderBy === row.name ? order : false}
                                                >
                                                    {
                                                        row.sortable === false ? (row.label) : (
                                                            <TableSortLabel
                                                                active={orderBy === row.name}
                                                                direction={order}
                                                                onClick={() => onClickSort(row.name)}
                                                            >
                                                                {row.label}
                                                            </TableSortLabel>
                                                        )
                                                    }
                                                </TableCell>
                                            ),
                                            this,
                                        )}
                                    </TableRow>
                                    {
                                        loading && (
                                            <tr>
                                                <td colSpan={columns.length}>
                                                    <LinearProgress/>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </MuiTableHead>
                            )
                        }
                    </NetworkContext.Consumer>
                )
            }
        </SettingsContext.Consumer>

    );
};

export default TableHead;
