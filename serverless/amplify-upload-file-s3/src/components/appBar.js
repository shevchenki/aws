import React from 'react';
// import { Auth } from "aws-amplify";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

export default function MyAppBar(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        ユーザー名："User Name"
                    </Typography>
                    <Button
                        color="inherit"
                        // onClick={() => onSignout()}
                    >サイアウト</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}