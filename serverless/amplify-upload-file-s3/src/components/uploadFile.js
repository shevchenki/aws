import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AttachFile from '@material-ui/icons/AttachFile';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import LinearProgress from '@material-ui/core/LinearProgress';
import ListData from './listData';
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
            width: "100%",
            height: theme.spacing(60),
        },
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing(1),
    },
    listData: {
        marginRight: 10,
        marginLeft: 10
    }
}));

export default function Variants() {
    const classes = useStyles();
    const [listData, setListData] = useState([]);

    const onChange = (e) => {
        let listFile = e.target.files;
        let metaData = [];
        Object.keys(listFile).forEach(function (k) {
            metaData.push({
                index: k,
                fileName: listFile[k].name,
                fileType: listFile[k].type,
                fileSize: listFile[k].size
            })
        })
        setListData(metaData);
    }

    console.log(listData)

    return (
        <div className={classes.root}>
            <Paper variant="outlined">
                <input
                    className={classes.input}
                    accept="*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={onChange}
                />
                <label htmlFor="contained-button-file">
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        component="span"
                        endIcon={<AttachFile />}
                    >
                        ファイル選択
                    </Button>
                </label>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    endIcon={<CloudUploadIcon />}
                    // onClick={() => this.onUpload(file, metaData)}
                >
                    アップロード
                </Button>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    endIcon={<ListIcon />}
                    // onClick={this.showListData}
                >
                    アップロード履歴
                </Button>
                <Paper className={classes.listData}>
                    {/* <LinearProgress variant="determinate" value={60} /> */}
                    <ListData
                        rows={listData}
                    />
                </Paper>
            </Paper>
        </div>
    );
}