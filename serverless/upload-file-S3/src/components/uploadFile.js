import React, { Component } from 'react';
import { compose } from 'recompose';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AttachFile from '@material-ui/icons/AttachFile';
import ListIcon from '@material-ui/icons/List';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Storage } from 'aws-amplify';
import API, { graphqlOperation } from '@aws-amplify/api';
import * as mutations from './../graphql/mutations';
import * as queries from './../graphql/queries';

import ListData from './listData';

const useStyles = withStyles(theme => ({
    root: {
        padding: 10,
        minHeight: 500
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing(1),
    },
    listData: {
        marginTop: 10
    }
}));

class UploadFile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            metaData: [],
            openDialog: false
        };
    }

    onChange = (e) => {
        let listFile = e.target.files;
        let metaData = [];
        Object.keys(listFile).forEach(function (k) {
            metaData.push({
                index: k,
                fileName: listFile[k].type + '/' + listFile[k].name,
                fileSize: listFile[k].size
            })
        })
        this.setState({
            file: listFile,
            metaData: metaData
        });
    }

    onUpload = (files, rows) => {
        if (files == null) {
            this.setState({
                openDialog: true
            })
            return;
        }
        let { authData } = this.props;
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let data = {};
        rows.forEach(row => {
            data = {
                userName: authData.username,
                fileName: row.fileName,
                fileSize: row.fileSize,
                uploadDate: date + ' ' + time,
                updateDate: date + ' ' + time,
                description: '新規作成'
            }
            // Upload file to S3
            Storage.put(row.fileName, files[row.index], { level: 'public' })
                .then(result => console.log(result))
                .catch(err => console.log(err));
            // Upload info to DynamoDB
            API.graphql(graphqlOperation(mutations.createPost, { input: data }))
                .then(result => console.log(result))
                .catch(err => console.log(err));
        })
        this.setState({
            file: null,
            metaData: []
        });
    }

    showListData = () => {
        let { authData } = this.props;
        let filter = {
            userName: {
                eq: authData.username
            }
        }
        API.graphql(graphqlOperation(queries.listPosts, { filter: filter, limit: 100 }))
            .then(result => {
                const metaData = result.data.listPosts.items;
                metaData.sort((a, b) => {
                    let nameA = a.fileName.toUpperCase();
                    let nameB = b.fileName.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
                this.setState({
                    file: null,
                    metaData: metaData
                });
            })
            .catch(err => console.log(err));
    }

    onCloseDialog = () => {
        this.setState({
            openDialog: false
        })
    }

    render() {
        const { classes } = this.props;
        const { file, metaData, openDialog } = this.state;
        return (
            <Paper className={classes.root}>
                <input
                    className={classes.input}
                    accept="*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={this.onChange}
                />
                <label htmlFor="contained-button-file">
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        startIcon={<AttachFile />}
                    >
                        ファイル選択
                    </Button>
                </label>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    endIcon={<CloudUploadIcon />}
                    onClick={() => this.onUpload(file, metaData)}
                >
                    アップロード
                </Button>
                <Dialog
                    open={openDialog}
                    onClose={() => this.onCloseDialog()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"警告"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            アプロードファイルを存在しません。
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.onCloseDialog()} color="primary" autoFocus>
                            確認
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    endIcon={<ListIcon />}
                    onClick={this.showListData}
                >
                    アップロード履歴
                </Button>
                <Paper className={classes.listData}>
                    <LinearProgress variant="determinate" value={60} />
                    <ListData
                        rows={metaData}
                    />
                </Paper>
            </Paper>
        )
    }
}

export default compose(useStyles)(UploadFile);