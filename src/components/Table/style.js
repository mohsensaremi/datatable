import withStyles from '@material-ui/core/styles/withStyles';

export default withStyles(theme => ({
    root: {},
    tableWrapper: {
        overflow: "auto",
    },
    table: {
        textAlign: 'center',
        minWidth: 1100,
    },
    disableMinWidth: {
        minWidth: 'auto',
    },
}), {flip: false});
