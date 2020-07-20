import React, { Fragment } from 'react';
import MyAppBar from './components/appBar';
import UploadFile from './components/uploadFile';

export default function App(props) {

    const { authState, authData } = props;
    
    if (authState === 'signedIn') {
        return (
            <Fragment>
                <MyAppBar authData={authData} />
                <UploadFile authData={authData}/>
            </Fragment>
        );
    } else {
        return null;
    }
}