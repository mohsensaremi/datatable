import React from 'react';
import MuiTableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {NetworkContext} from "../../context";

const TableBody = (props) => {

    const {
        classes,
        columns,
        rowClassName,
    } = props;

    return (
        <NetworkContext.Consumer>
            {
                ({data}) => (
                    <MuiTableBody>
                        {
                            Array.isArray(data) && data.map((n, index) => {

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={n.id}
                                        className={`${index % 2 === 1 && classes.greyRow} ${typeof rowClassName === 'function' && rowClassName(n, index)}`}
                                    >
                                        {
                                            columns.map(c => (
                                                <TableCell key={c.name}>
                                                    {
                                                        typeof c.render === 'function' ?
                                                            c.render(n) :
                                                            n[c.name]
                                                    }
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                );
                            })}
                    </MuiTableBody>
                )
            }
        </NetworkContext.Consumer>
    );
};

export default TableBody;
