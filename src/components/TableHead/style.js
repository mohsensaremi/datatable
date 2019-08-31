import withStyles from '@material-ui/core/styles/withStyles';
import {lighten} from "@material-ui/core/styles/colorManipulator";

export default withStyles(theme => ({
    root: {
        paddingRight: theme.spacing(),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
}), {flip: false});
